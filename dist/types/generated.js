// Auto-generated from Teamleader Focus API OpenAPI spec
// Do not edit manually — run `npm run generate` to regenerate
// Source: api-spec.yaml
// Generated: 2026-03-27T09:58:33.537Z
//
// ⚠️  Post-generation patches (spec deviations reported to Teamleader):
//
// 1. NoteSubjectTypesCreate missing "meeting"
//    The API accepts "meeting" as subject.type in notes.create, but the
//    OpenAPI spec omits it from the NoteSubjectTypesCreate enum.
//    Patch: added "meeting" to all NoteSubjectTypesCreate occurrences.
//
// 2. dealPhases.duplicate returns 404
//    The endpoint exists in the spec but is not functional in the API.
//    No patch needed — the SDK includes the method, tests skip it.
//
// 5. Context enum: "deal" → "sale" + 6 missing contexts
//    The spec uses "deal" but the API requires "sale". Also missing:
//    meeting, todo, callback, meeting_report, pro_external_cost, werkbonnen.
//    Patch: replaced enum in all 9 occurrences.
//
// 6. custom_fields_update_strategy missing from update request types
//    The API supports "partial" strategy on 11 update endpoints but the
//    spec omits the parameter entirely. Not supported on tickets.update.
//    Patch: added optional property to 11 operation request bodies.
//
// 7. tasks.list missing deal_id filter
//    The API accepts deal_id as a filter on tasks.list but the spec omits it.
//    Patch: added optional deal_id to the tasks.listrequest filter.
//
// 🧹 Post-generation cleanups (openapi-typescript artifacts):
//
// 3. Removed "& unknown" intersection artifacts (~500 occurrences)
//    openapi-typescript emits these from allOf schemas — they add no type
//    information and hinder language-server autocomplete (especially Deno LS).
//
// 4. Removed "& Record<string, never>" intersection artifacts (~56 occurrences)
//    Same cause as above — empty record intersections that block property
//    assignment and confuse LS type resolution.
export {};
//# sourceMappingURL=generated.js.map