// Auto-generated from Teamleader Focus API OpenAPI spec
// Do not edit manually — run `npm run generate` to regenerate
// Source: https://unpkg.com/@teamleader/focus-api-specification/dist/api.focus.teamleader.eu.dereferenced.yaml
// Generated: 2026-02-07T20:35:06.114Z
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
export {};
//# sourceMappingURL=generated.js.map