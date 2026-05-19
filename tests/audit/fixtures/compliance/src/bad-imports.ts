// Fixture: principle III violation — imports Node-only modules.
// Would silently break Deno / Supabase Edge Function deployments
// if it appeared in real src/.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function readSomething(p: string): string {
  return readFileSync(resolve(p), "utf8");
}
