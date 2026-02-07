/**
 * Verifies that RequestBody types correctly resolve to full parameter
 * structures from the YAML spec, and that TypeScript enforces them.
 */
import { describe, it, expectTypeOf } from "vitest";
import type { TeamleaderClient } from "../src/client.js";
import type { RequestBody, ResponseBody } from "../src/types/common.js";

describe("Type resolution", () => {
  // We only test types — no runtime calls needed.
  // `expectTypeOf` is a compile-time check.

  it("deals.list request accepts filter, page, sort, includes", () => {
    type Params = RequestBody<"deals.list">;

    // Should have filter, page, sort, includes as top-level keys
    expectTypeOf<Params>().toHaveProperty("filter");
    expectTypeOf<Params>().toHaveProperty("page");
    expectTypeOf<Params>().toHaveProperty("sort");
    expectTypeOf<Params>().toHaveProperty("includes");
  });

  it("deals.list filter has the right fields", () => {
    type Filter = NonNullable<RequestBody<"deals.list">["filter"]>;

    expectTypeOf<Filter>().toHaveProperty("term");
    expectTypeOf<Filter>().toHaveProperty("ids");
    expectTypeOf<Filter>().toHaveProperty("customer");
    expectTypeOf<Filter>().toHaveProperty("phase_id");
    expectTypeOf<Filter>().toHaveProperty("status");
    expectTypeOf<Filter>().toHaveProperty("responsible_user_id");
    expectTypeOf<Filter>().toHaveProperty("estimated_closing_date");
    expectTypeOf<Filter>().toHaveProperty("estimated_closing_date_from");
    expectTypeOf<Filter>().toHaveProperty("estimated_closing_date_until");
    expectTypeOf<Filter>().toHaveProperty("updated_since");
    expectTypeOf<Filter>().toHaveProperty("created_before");
    expectTypeOf<Filter>().toHaveProperty("pipeline_ids");
  });

  it("deals.create request requires lead and title", () => {
    type Params = RequestBody<"deals.create">;

    expectTypeOf<Params>().toHaveProperty("lead");
    expectTypeOf<Params>().toHaveProperty("title");
    expectTypeOf<Params>().toHaveProperty("summary");
    expectTypeOf<Params>().toHaveProperty("source_id");
    expectTypeOf<Params>().toHaveProperty("department_id");
    expectTypeOf<Params>().toHaveProperty("responsible_user_id");
    expectTypeOf<Params>().toHaveProperty("phase_id");
    expectTypeOf<Params>().toHaveProperty("estimated_value");
    expectTypeOf<Params>().toHaveProperty("estimated_probability");
    expectTypeOf<Params>().toHaveProperty("estimated_closing_date");
    expectTypeOf<Params>().toHaveProperty("custom_fields");
    expectTypeOf<Params>().toHaveProperty("currency");
  });

  it("deals.list response has deal fields", () => {
    type Response = ResponseBody<"deals.list">;
    type Deal = NonNullable<NonNullable<Response>["data"]>[number];

    expectTypeOf<Deal>().toHaveProperty("id");
    expectTypeOf<Deal>().toHaveProperty("title");
    expectTypeOf<Deal>().toHaveProperty("status");
    expectTypeOf<Deal>().toHaveProperty("lead");
    expectTypeOf<Deal>().toHaveProperty("estimated_value");
    expectTypeOf<Deal>().toHaveProperty("current_phase");
    expectTypeOf<Deal>().toHaveProperty("responsible_user");
    expectTypeOf<Deal>().toHaveProperty("web_url");
  });

  it("contacts.list request accepts filter and page", () => {
    type Params = RequestBody<"contacts.list">;

    expectTypeOf<Params>().toHaveProperty("filter");
    expectTypeOf<Params>().toHaveProperty("page");
    expectTypeOf<Params>().toHaveProperty("sort");
  });

  it("contacts.add request has name fields", () => {
    type Params = RequestBody<"contacts.add">;

    expectTypeOf<Params>().toHaveProperty("first_name");
    expectTypeOf<Params>().toHaveProperty("last_name");
    expectTypeOf<Params>().toHaveProperty("emails");
  });

  it("invoices.list request accepts filter and page", () => {
    type Params = RequestBody<"invoices.list">;

    expectTypeOf<Params>().toHaveProperty("filter");
    expectTypeOf<Params>().toHaveProperty("page");
  });

  it("void operations resolve to void response", () => {
    type UpdateResponse = ResponseBody<"deals.update">;
    expectTypeOf<UpdateResponse>().toEqualTypeOf<void>();
  });
});
