import { printCoverageReport } from "./coverage-tracker.js";

export async function teardown(): Promise<void> {
  printCoverageReport();
}
