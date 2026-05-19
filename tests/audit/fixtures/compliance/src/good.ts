// Fixture: passes principles III and V cleanly.
// (Principles I, II, IV, VI are n/a for a non-generated, non-package,
// non-resource src/ file.)

export function safe(n: number): number {
  if (n < 0) throw new TeamleaderFocusValidationError("must be non-negative");
  return n * 2;
}

// Stub class so the fixture parses without depending on the real SDK.
declare class TeamleaderFocusValidationError extends Error {
  constructor(message: string);
}
