import { describe, it, expect, afterAll } from "vitest";
import {
  getClient,
  noToken,
  cleanupAll,
  delay,
  isoDate,
  isoDateTime,
  futureDate,
  collect,
} from "./setup.js";

describe.skipIf(noToken)("Activities", () => {
  const client = getClient();

  let contactId: string;
  let userId: string;
  let activityTypeId: string;
  let workTypeId: string;

  // -----------------------------------------------------------------------
  // Shared setup
  // -----------------------------------------------------------------------

  describe.sequential("setup", () => {
    it("create test contact", async () => {
      const res = await client.contacts.add({
        first_name: "SDK",
        last_name: "ActivityTest",
      });
      contactId = (res.data as { id: string }).id;
    });

    it("get current user", async () => {
      const res = await client.users.me();
      userId = (res.data as { id: string }).id;
    });

    it("fetch activity type", async () => {
      const res = await collect(client.activityTypes.list(undefined, { maxPages: 1 }));
      const types = res as Array<{ id: string; type?: string }>;
      expect(types.length).toBeGreaterThan(0);
      // Use first available activity type
      activityTypeId = types[0].id;
    });

    it("fetch work type", async () => {
      const res = await collect(client.workTypes.list(undefined, { maxPages: 1 }));
      const types = res as Array<{ id: string }>;
      expect(types.length).toBeGreaterThan(0);
      workTypeId = types[0].id;
    });
  });

  // -----------------------------------------------------------------------
  // Tasks
  // -----------------------------------------------------------------------

  describe.sequential("tasks", () => {
    let taskId: string;

    it("create", async () => {
      const res = await client.tasks.create({
        title: "SDK integration test task",
        description: "Created by SDK integration tests",
        due_on: futureDate(7),
        work_type_id: workTypeId,
        assignee: { type: "user", id: userId },
      });
      expect(res).toHaveProperty("data");
      taskId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.tasks.info({ id: taskId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(taskId);
    });

    it("list", async () => {
      const res = await collect(client.tasks.list({
        filter: { user_id: userId },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.tasks.update({
        id: taskId,
        description: "SDK task — updated",
      });
    });

    it("complete", async () => {
      await client.tasks.complete({ id: taskId });
    });

    it("reopen", async () => {
      await client.tasks.reopen({ id: taskId });
    });

    it("schedule", async () => {
      const res = await client.tasks.schedule({
        id: taskId,
        starts_at: isoDateTime(2),
        ends_at: isoDateTime(3),
      });
      expect(res).toHaveProperty("data");
    });

    it("delete", async () => {
      await client.tasks.delete({ id: taskId });
    });
  });

  // -----------------------------------------------------------------------
  // Meetings
  // -----------------------------------------------------------------------

  describe.sequential("meetings", () => {
    let meetingId: string;

    it("schedule", async () => {
      const res = await client.meetings.schedule({
        title: "SDK integration test meeting",
        starts_at: isoDateTime(24),
        ends_at: isoDateTime(25),
        attendees: [{ type: "user", id: userId }],
      });
      expect(res).toHaveProperty("data");
      meetingId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.meetings.info({ id: meetingId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(meetingId);
    });

    it("list", async () => {
      const res = await collect(client.meetings.list({
        filter: {
          start_date: isoDate(),
          end_date: futureDate(30),
        },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.meetings.update({
        id: meetingId,
        title: "SDK meeting — updated",
      });
    });

    it("createReport", async () => {
      const res = await client.meetings.createReport({
        id: meetingId,
        attach_to: { type: "contact", id: contactId },
        summary: "SDK test meeting report",
      });
      expect(res).toHaveProperty("data");
    });

    it("complete", async () => {
      await client.meetings.complete({ id: meetingId });
    });

    it("delete", async () => {
      await client.meetings.delete({ id: meetingId });
    });
  });

  // -----------------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------------

  describe.sequential("events", () => {
    let eventId: string;

    it("create", async () => {
      const res = await client.events.create({
        title: "SDK integration test event",
        activity_type_id: activityTypeId,
        starts_at: isoDateTime(48),
        ends_at: isoDateTime(49),
        links: [{ type: "contact", id: contactId }],
      });
      expect(res).toHaveProperty("data");
      eventId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.events.info({ id: eventId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(eventId);
    });

    it("list", async () => {
      const res = await collect(client.events.list({
        filter: {
          // API requires datetime format (not date). Spec uses ends_after
          // as "start of period" and starts_before as "end of period".
          ends_after: isoDateTime(0),
          starts_before: isoDateTime(24 * 60),
        },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.events.update({
        id: eventId,
        title: "SDK event — updated",
      });
    });

    it("cancel", async () => {
      await client.events.cancel({ id: eventId });
    });
  });

  // -----------------------------------------------------------------------
  // Calls
  // -----------------------------------------------------------------------

  describe.sequential("calls", () => {
    let callId: string;
    let callOutcomeId: string | undefined;

    it("rate-limit cooldown", async () => {
      await delay(3000);
    });

    it("fetch callOutcome ID", async () => {
      const res = await collect(client.callOutcomes.list(undefined, { maxPages: 1 }));
      const outcomes = res as Array<{ id: string }>;
      if (outcomes.length > 0) {
        callOutcomeId = outcomes[0].id;
      }
    });

    it("add", async () => {
      const res = await client.calls.add({
        participant: { customer: { type: "contact", id: contactId } },
        due_at: isoDateTime(2),
        assignee: { type: "user", id: userId },
        description: "SDK integration test call",
      });
      expect(res).toHaveProperty("data");
      callId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.calls.info({ id: callId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(callId);
    });

    it("list", async () => {
      // calls.list filter has no user_id — use date range instead
      const res = await collect(client.calls.list({
        filter: { scheduled_after: isoDate() },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      await client.calls.update({
        id: callId,
        description: "SDK call — updated",
      });
    });

    it("complete", async () => {
      if (!callOutcomeId) return; // skip if no outcomes available
      await client.calls.complete({
        id: callId,
        call_outcome_id: callOutcomeId,
      });
    });
  });

  // -----------------------------------------------------------------------
  // Timers
  // -----------------------------------------------------------------------

  describe.sequential("timers", () => {
    let timerId: string;

    it("rate-limit cooldown", async () => {
      await delay(3000);
    });

    it("start", async () => {
      const res = await client.timers.start({
        subject: { type: "contact", id: contactId },
        description: "SDK timer test",
        work_type_id: workTypeId,
      });
      expect(res).toHaveProperty("data");
      timerId = (res.data as { id: string }).id;
    });

    it("current", async () => {
      const res = await client.timers.current();
      expect(res).toHaveProperty("data");
    });

    it("update", async () => {
      // timers.update updates the currently running timer — no id parameter
      await client.timers.update({
        description: "SDK timer — updated",
      });
    });

    it("stop", async () => {
      // timers.stop takes no body — stops the currently running timer
      const res = await client.timers.stop();
      expect(res).toHaveProperty("data");
    });
  });

  // -----------------------------------------------------------------------
  // Time Tracking
  // -----------------------------------------------------------------------

  describe.sequential("timeTracking", () => {
    let timeTrackingId: string;

    it("rate-limit cooldown", async () => {
      await delay(3000);
    });

    it("add", async () => {
      const res = await client.timeTracking.add({
        subject: { type: "contact", id: contactId },
        started_on: isoDate(),
        duration: 3600, // 1 hour in seconds
        description: "SDK time tracking test",
        user_id: userId,
        work_type_id: workTypeId,
      });
      expect(res).toHaveProperty("data");
      timeTrackingId = (res.data as { id: string }).id;
    });

    it("info", async () => {
      const res = await client.timeTracking.info({ id: timeTrackingId });
      expect(res).toHaveProperty("data");
      expect((res.data as { id: string }).id).toBe(timeTrackingId);
    });

    it("list", async () => {
      const res = await collect(client.timeTracking.list({
        filter: { user_id: userId },
        page: { size: 10, number: 1 },
      }, { maxPages: 1 }));
      expect(Array.isArray(res)).toBe(true);
    });

    it("update", async () => {
      // timeTracking.update requires duration + started_on (or started_at)
      await client.timeTracking.update({
        id: timeTrackingId,
        duration: 3600,
        started_on: isoDate(),
        description: "SDK time tracking — updated",
      });
    });

    it("resume", async () => {
      const res = await client.timeTracking.resume({ id: timeTrackingId });
      expect(res).toHaveProperty("data");
      // Stop the timer that resume may have started
      try {
        const current = await client.timers.current();
        if (current.data) {
          await client.timers.stop();
        }
      } catch {
        // ignore
      }
    });

    it("delete", async () => {
      await client.timeTracking.delete({ id: timeTrackingId });
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------

  afterAll(async () => {
    await cleanupAll([
      () => client.contacts.delete({ id: contactId }),
    ]);
  });
});
