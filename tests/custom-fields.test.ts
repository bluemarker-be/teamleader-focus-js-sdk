import { describe, it, expect } from "vitest";
import { customField } from "../src/helpers/custom-fields.js";

describe("customField", () => {
  const entity = {
    id: "x",
    custom_fields: [
      { definition: { id: "field-1", type: "customFieldDefinition" }, value: "hello" },
      { definition: { id: "field-2" }, value: 42 },
      { definition: { id: "field-3" }, value: ["a", "b"] },
      { definition: { id: "field-4" }, value: true },
      { definition: { id: "field-5" }, value: { id: "rel-1", type: "company" } },
    ],
  };

  it("reads a string value by field id", () => {
    expect(customField<string>(entity, "field-1")).toBe("hello");
  });

  it("reads a number value", () => {
    expect(customField<number>(entity, "field-2")).toBe(42);
  });

  it("reads an array value", () => {
    expect(customField<string[]>(entity, "field-3")).toEqual(["a", "b"]);
  });

  it("reads a boolean value", () => {
    expect(customField<boolean>(entity, "field-4")).toBe(true);
  });

  it("reads a related-entity value", () => {
    const rel = customField<{ id: string; type: string }>(entity, "field-5");
    expect(rel).toEqual({ id: "rel-1", type: "company" });
  });

  it("returns undefined when field id is not present", () => {
    expect(customField(entity, "nonexistent")).toBeUndefined();
  });

  it("returns undefined when entity has no custom_fields", () => {
    expect(customField({}, "field-1")).toBeUndefined();
  });

  it("returns undefined when entity is null or undefined", () => {
    expect(customField(null, "field-1")).toBeUndefined();
    expect(customField(undefined, "field-1")).toBeUndefined();
  });

  it("returns undefined when custom_fields is an empty array", () => {
    expect(customField({ custom_fields: [] }, "field-1")).toBeUndefined();
  });

  it("handles entities where definition is missing on some entries", () => {
    const weird = {
      custom_fields: [
        { value: "orphan" },
        { definition: { id: "field-1" }, value: "found" },
      ],
    };
    expect(customField<string>(weird, "field-1")).toBe("found");
  });
});
