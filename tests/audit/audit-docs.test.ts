/**
 * Unit tests for scripts/audit-docs.ts.
 *
 * Uses inline mini-READMEs + synthetic ExtractedResource arrays;
 * never touches the real README or SDK source tree.
 */

import { describe, expect, it } from "vitest";

import {
  runDocsAgainst,
  parseResourceTable,
  extractTsSnippets,
  extractClientCalls,
} from "../../scripts/audit-docs.js";
import type { ExtractedResource } from "../../scripts/audit-lib/ast.js";
import type { AuditContext } from "../../scripts/audit-lib/types.js";

const CTX: AuditContext = {
  sha: "0000000000000000000000000000000000000000",
  branch: "test",
  repoRoot: "/fake/repo",
};

const OPTS = { readmeRelPath: "README.md" };

// ---------------------------------------------------------------------------
// parseResourceTable
// ---------------------------------------------------------------------------

describe("parseResourceTable", () => {
  it("parses a well-formed resources table", () => {
    const md = `
# Title

## Resources

| Resource | Methods |
| --- | --- |
| \`accounts\` | \`projectsV2Status\` |
| \`contacts\` | \`list\` \`info\` \`add\` \`update\` \`delete\` |

## Next Section
`;
    const result = parseResourceTable(md);
    expect(result.get("accounts")).toEqual(new Set(["projectsV2Status"]));
    expect(result.get("contacts")).toEqual(
      new Set(["list", "info", "add", "update", "delete"]),
    );
  });

  it("stops parsing at the next section heading", () => {
    const md = `
## Resources

| Resource | Methods |
| --- | --- |
| \`a\` | \`x\` |

## Examples

| Some | Other |
| --- | --- |
| \`b\` | \`y\` |
`;
    const result = parseResourceTable(md);
    expect(result.has("a")).toBe(true);
    expect(result.has("b")).toBe(false);
  });

  it("returns empty when the Resources heading is absent", () => {
    const md = `
## Setup

| Resource | Methods |
| --- | --- |
| \`a\` | \`x\` |
`;
    const result = parseResourceTable(md);
    expect(result.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// extractTsSnippets
// ---------------------------------------------------------------------------

describe("extractTsSnippets", () => {
  it("extracts ```typescript and ```ts blocks", () => {
    const md = [
      "intro",
      "```typescript",
      "const x = 1;",
      "```",
      "between",
      "```ts",
      "const y = 2;",
      "```",
      "outro",
    ].join("\n");
    const snippets = extractTsSnippets(md);
    expect(snippets.length).toBe(2);
    expect(snippets[0].code).toBe("const x = 1;");
    expect(snippets[1].code).toBe("const y = 2;");
  });

  it("ignores ```bash and other non-ts blocks", () => {
    const md = "```bash\nls\n```\n```typescript\nfoo;\n```";
    const snippets = extractTsSnippets(md);
    expect(snippets.length).toBe(1);
    expect(snippets[0].code).toBe("foo;");
  });
});

// ---------------------------------------------------------------------------
// extractClientCalls
// ---------------------------------------------------------------------------

describe("extractClientCalls", () => {
  it("matches client.X.Y( calls", () => {
    expect(extractClientCalls("client.contacts.list({})")).toEqual([
      { resource: "contacts", method: "list" },
    ]);
  });

  it("matches teamleader.X.Y( calls", () => {
    expect(extractClientCalls("teamleader.deals.create({})")).toEqual([
      { resource: "deals", method: "create" },
    ]);
  });

  it("returns multiple matches in one snippet", () => {
    const code = `
      const c = client.contacts.list();
      const d = teamleader.deals.win({ id: 'x' });
    `;
    const calls = extractClientCalls(code);
    expect(calls).toContainEqual({ resource: "contacts", method: "list" });
    expect(calls).toContainEqual({ resource: "deals", method: "win" });
  });

  it("does NOT match unrelated property accesses", () => {
    expect(extractClientCalls("obj.foo.bar()")).toEqual([]);
    expect(extractClientCalls("client.something")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// runDocsAgainst — end-to-end
// ---------------------------------------------------------------------------

function fakeResource(
  className: string,
  methods: string[],
): ExtractedResource {
  return {
    class_name: className,
    file: `src/resources/${className.toLowerCase()}.ts`,
    methods: methods.map((m) => ({
      name: m,
      endpoint: `/${className.toLowerCase()}.${m}`,
      param_type_text: "",
      return_envelope: "single" as const,
      line: 1,
      jsdoc: "",
    })),
  };
}

describe("runDocsAgainst", () => {
  it("flags documented-but-absent: README lists a method that doesn't exist", async () => {
    const readme = `
## Resources

| Resource | Methods |
| --- | --- |
| \`contacts\` | \`list\` \`info\` \`add\` \`delete\` \`removedMethod\` |
`;
    const extracted = [fakeResource("ContactsResource", ["list", "info", "add", "delete"])];
    const result = await runDocsAgainst(readme, extracted, CTX, OPTS);
    const messages = result.findings.map((f) => f.message);
    expect(messages.some((m) => m.includes("removedMethod"))).toBe(true);
    expect(result.findings.find((f) => f.message.includes("removedMethod"))?.severity).toBe("high");
  });

  it("flags documented-but-absent: README lists a resource that doesn't exist", async () => {
    const readme = `
## Resources

| Resource | Methods |
| --- | --- |
| \`ghostResource\` | \`list\` |
`;
    const extracted: ExtractedResource[] = [];
    const result = await runDocsAgainst(readme, extracted, CTX, OPTS);
    expect(
      result.findings.some((f) => f.message.includes("ghostResource") && f.severity === "high"),
    ).toBe(true);
  });

  it("flags present-but-undocumented when an existing method is missing from README", async () => {
    const readme = `
## Resources

| Resource | Methods |
| --- | --- |
| \`contacts\` | \`list\` \`info\` |
`;
    const extracted = [fakeResource("ContactsResource", ["list", "info", "add"])];
    const result = await runDocsAgainst(readme, extracted, CTX, OPTS);
    expect(
      result.findings.some(
        (f) => f.message.includes("contacts.add") && f.severity === "medium",
      ),
    ).toBe(true);
  });

  it("flags snippet-broken when a snippet calls a method that doesn't exist", async () => {
    const readme = `
## Resources

| Resource | Methods |
| --- | --- |
| \`contacts\` | \`list\` \`info\` |

## Usage

\`\`\`typescript
client.contacts.fakeMethod({});
\`\`\`
`;
    const extracted = [fakeResource("ContactsResource", ["list", "info"])];
    const result = await runDocsAgainst(readme, extracted, CTX, OPTS);
    const broken = result.findings.find((f) => f.message.includes("fakeMethod"));
    expect(broken).toBeDefined();
    expect(broken!.severity).toBe("high");
    expect(broken!.remediation.kind).toBe("in-pr");
  });

  it("produces zero findings when README and SDK agree exactly", async () => {
    const readme = `
## Resources

| Resource | Methods |
| --- | --- |
| \`contacts\` | \`list\` \`info\` \`add\` |

## Usage

\`\`\`typescript
client.contacts.add({ name: 'x' });
\`\`\`
`;
    const extracted = [fakeResource("ContactsResource", ["list", "info", "add"])];
    const result = await runDocsAgainst(readme, extracted, CTX, OPTS);
    expect(result.findings).toEqual([]);
  });
});
