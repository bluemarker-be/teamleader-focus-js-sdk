// Fixture: principle V violation — throws bare Error instead of a
// TeamleaderFocus* subclass, so consumers can't pattern-match on it.

export function alwaysFails(): never {
  throw new Error("nope");
}

export function alsoFails(): never {
  throw new TypeError("wrong type");
}
