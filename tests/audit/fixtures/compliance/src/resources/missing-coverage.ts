// Fixture: resource with a method the mocked verify-endpoints payload
// flags as missing live integration coverage — principle VI = "partial".

export class MissingCoverageResource {
  list() {}
  someUntestedMethod() {}
}
