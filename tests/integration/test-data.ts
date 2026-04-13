/**
 * Shared constants for integration tests.
 * All values prefixed with "SDK" for easy identification and cleanup.
 */
export const TEST = {
  email: "test-sdk@operative.pro",
  contact: { first_name: "SDK", last_name: "IntegrationTest" },
  company: { name: "SDK Test Corp" },
  deal: { title: "SDK Test Deal" },
  project: { title: "SDK Test Project" },
  invoice: { description: "SDK test line item" },
  tag: "sdk-integration-test",
} as const;
