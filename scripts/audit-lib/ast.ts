/**
 * TypeScript Compiler API helpers shared by every audit module.
 *
 * Reuses the same `typescript` devDep that powers `verify-endpoints.ts`,
 * so no new dependency is taken (research Decision 1).
 *
 * The audited surface is the SDK source tree under `src/`. Every helper
 * here takes a fully-loaded ts.Program (so callers can share the
 * type checker if they need it).
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";

import ts from "typescript";

import type { ReturnEnvelope } from "./types.js";

// ---------------------------------------------------------------------------
// Program loading
// ---------------------------------------------------------------------------

/**
 * Build a ts.Program from a tsconfig path, optionally including extra
 * root files (e.g., test files that tsconfig excludes).
 */
export function loadProgram(
  tsconfigPath: string,
  extraRoots: string[] = [],
): ts.Program {
  const configRead = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configRead.error) {
    throw new Error(
      `Failed to read ${tsconfigPath}: ${ts.flattenDiagnosticMessageText(
        configRead.error.messageText,
        "\n",
      )}`,
    );
  }
  const parsed = ts.parseJsonConfigFileContent(
    configRead.config,
    ts.sys,
    dirname(tsconfigPath),
  );
  return ts.createProgram({
    rootNames: [...parsed.fileNames, ...extraRoots],
    options: parsed.options,
  });
}

// ---------------------------------------------------------------------------
// Resource introspection
// ---------------------------------------------------------------------------

export interface ExtractedMethod {
  /** Method name as declared on the resource class (e.g., "add", "list"). */
  name: string;
  /**
   * Teamleader endpoint URL from the first `this.client.X(...)` call inside
   * the method body. Empty string if the method doesn't match the standard
   * pattern.
   */
  endpoint: string;
  /**
   * Text of the first parameter's type annotation, e.g. `RequestBody<"contacts.add">`.
   * Empty if no parameter or no annotation.
   */
  param_type_text: string;
  return_envelope: ReturnEnvelope;
  /** 1-indexed line of the method declaration. */
  line: number;
  /** Method's leading JSDoc/line-comment text, normalized. */
  jsdoc: string;
}

export interface ExtractedResource {
  /** Class name (e.g., "ContactsResource"). */
  class_name: string;
  /** Absolute path of the file the class is declared in. */
  file: string;
  methods: ExtractedMethod[];
}

/**
 * Walk all `src/resources/*.ts` files and return one ExtractedResource per
 * class that extends BaseResource. Methods are returned in source order;
 * callers should sort if they need stability.
 */
export function getResourceClasses(
  program: ts.Program,
  resourcesDirAbs: string,
): ExtractedResource[] {
  const out: ExtractedResource[] = [];
  const resourceFiles = listTsFiles(resourcesDirAbs).filter(
    (f) => !f.endsWith("/base.ts"),
  );

  for (const file of resourceFiles) {
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) continue;
    ts.forEachChild(sourceFile, (node) => {
      if (!ts.isClassDeclaration(node) || !node.name) return;
      if (!extendsBaseResource(node)) return;
      const methods: ExtractedMethod[] = [];
      for (const member of node.members) {
        if (!ts.isMethodDeclaration(member)) continue;
        if (hasModifier(member, ts.SyntaxKind.StaticKeyword)) continue;
        if (hasModifier(member, ts.SyntaxKind.PrivateKeyword)) continue;
        const extracted = extractMethod(member, sourceFile);
        if (extracted) methods.push(extracted);
      }
      out.push({
        class_name: node.name.text,
        file,
        methods,
      });
    });
  }

  return out;
}

function extendsBaseResource(cls: ts.ClassDeclaration): boolean {
  return !!cls.heritageClauses?.some((clause) =>
    clause.types.some((t) => {
      if (!ts.isIdentifier(t.expression)) return false;
      return t.expression.text === "BaseResource";
    }),
  );
}

function hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean {
  return !!ts.canHaveModifiers(node) &&
    !!ts.getModifiers(node)?.some((m) => m.kind === kind);
}

function extractMethod(
  method: ts.MethodDeclaration,
  sourceFile: ts.SourceFile,
): ExtractedMethod | null {
  if (!ts.isIdentifier(method.name)) return null;
  const name = method.name.text;
  const { line } = sourceFile.getLineAndCharacterOfPosition(
    method.getStart(sourceFile),
  );

  const firstParam = method.parameters[0];
  const param_type_text = firstParam?.type
    ? firstParam.type.getText(sourceFile)
    : "";

  let endpoint = "";
  let return_envelope: ReturnEnvelope = "other";

  if (method.body) {
    const found = findFirstClientCall(method.body);
    if (found) {
      endpoint = found.endpoint;
      return_envelope = found.envelope;
    }
  }

  return {
    name,
    endpoint,
    param_type_text,
    return_envelope,
    line: line + 1,
    jsdoc: getLeadingJsDoc(method, sourceFile),
  };
}

interface ClientCallInfo {
  endpoint: string;
  envelope: ReturnEnvelope;
}

/**
 * Walk a method body looking for the first `this.client.X(...)` call. The
 * called identifier (X) plus its type generic determine the return envelope:
 * - `request<void>` → "void"
 * - `request<T>` (any other T) → "single"
 * - `paginateItems<T>` → "iterable"
 * - anything else → "other"
 */
function findFirstClientCall(node: ts.Node): ClientCallInfo | null {
  let result: ClientCallInfo | null = null;
  const visit = (n: ts.Node): void => {
    if (result) return;
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
      const access = n.expression;
      const inner = access.expression;
      // Match: this.client.<method>
      if (
        ts.isPropertyAccessExpression(inner) &&
        inner.expression.kind === ts.SyntaxKind.ThisKeyword &&
        ts.isIdentifier(inner.name) &&
        inner.name.text === "client" &&
        ts.isIdentifier(access.name)
      ) {
        const clientMethod = access.name.text;
        const endpoint = extractFirstStringArg(n);
        result = {
          endpoint,
          envelope: classifyEnvelope(clientMethod, n.typeArguments),
        };
        return;
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(node);
  return result;
}

function extractFirstStringArg(call: ts.CallExpression): string {
  for (const arg of call.arguments) {
    if (ts.isStringLiteral(arg)) return arg.text;
  }
  return "";
}

function classifyEnvelope(
  clientMethod: string,
  typeArgs: ts.NodeArray<ts.TypeNode> | undefined,
): ReturnEnvelope {
  if (clientMethod === "paginateItems" || clientMethod === "paginatePages") {
    return "iterable";
  }
  if (clientMethod !== "request") return "other";
  const first = typeArgs?.[0];
  if (!first) return "single";
  if (first.kind === ts.SyntaxKind.VoidKeyword) return "void";
  return "single";
}

function getLeadingJsDoc(
  node: ts.Node,
  sourceFile: ts.SourceFile,
): string {
  const ranges = ts.getLeadingCommentRanges(
    sourceFile.text,
    node.getFullStart(),
  );
  if (!ranges || ranges.length === 0) return "";
  const last = ranges[ranges.length - 1];
  const raw = sourceFile.text.slice(last.pos, last.end);
  // Strip /** */ or // wrappers and leading * gutters, collapse whitespace.
  return raw
    .replace(/^\/\*\*?|\*\/$/g, "")
    .replace(/^\s*\*\s?/gm, "")
    .replace(/^\s*\/\/\s?/gm, "")
    .trim();
}

// ---------------------------------------------------------------------------
// Import scanning (principle III — multi-runtime portability)
// ---------------------------------------------------------------------------

export interface ExtractedImport {
  /** Module specifier text (e.g., "node:fs", "./client.js", "typescript"). */
  module: string;
  /** True if the import only brings in types (and is erased at runtime). */
  type_only: boolean;
  /** 1-indexed line. */
  line: number;
}

export function getImports(sourceFile: ts.SourceFile): ExtractedImport[] {
  const out: ExtractedImport[] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isImportDeclaration(node)) return;
    if (!ts.isStringLiteral(node.moduleSpecifier)) return;
    const { line } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    );
    out.push({
      module: node.moduleSpecifier.text,
      type_only: node.importClause?.isTypeOnly === true,
      line: line + 1,
    });
  });
  return out;
}

// ---------------------------------------------------------------------------
// Throw-site scanning (principle V — typed errors)
// ---------------------------------------------------------------------------

export type ThrowKind =
  /** `throw new X(...)` — argument is a constructor call. */
  | "new"
  /** `throw <identifier>` — re-throwing an already-typed error from a catch binding. */
  | "rethrow"
  /** `throw cond ? A : B` — ternary; we capture every constructor name from both branches. */
  | "conditional"
  /** Anything else (function-call expression, throw of a literal, etc.). */
  | "other";

export interface ExtractedThrow {
  /**
   * Primary class name being instantiated, when `kind === "new"`.
   * For `"conditional"`, this is the first NewExpression encountered
   * (use `ctor_class_names_all` for the full set). Empty otherwise.
   */
  ctor_class_name: string;
  /** Every constructor name reachable from the throw expression. */
  ctor_class_names_all: string[];
  kind: ThrowKind;
  /** 1-indexed line. */
  line: number;
}

export function getThrowSites(sourceFile: ts.SourceFile): ExtractedThrow[] {
  const out: ExtractedThrow[] = [];
  const visit = (n: ts.Node): void => {
    if (ts.isThrowStatement(n)) {
      const { line } = sourceFile.getLineAndCharacterOfPosition(
        n.getStart(sourceFile),
      );
      const { kind, names } = classifyThrow(n.expression);
      out.push({
        ctor_class_name: names[0] ?? "",
        ctor_class_names_all: names,
        kind,
        line: line + 1,
      });
    }
    ts.forEachChild(n, visit);
  };
  visit(sourceFile);
  return out;
}

function classifyThrow(expr: ts.Expression): {
  kind: ThrowKind;
  names: string[];
} {
  if (ts.isNewExpression(expr)) {
    return { kind: "new", names: [extractCtorName(expr)].filter(Boolean) };
  }
  if (ts.isIdentifier(expr)) {
    // `throw error` — re-throwing whatever the catch binding holds.
    return { kind: "rethrow", names: [] };
  }
  if (ts.isConditionalExpression(expr)) {
    const names: string[] = [];
    for (const branch of [expr.whenTrue, expr.whenFalse]) {
      const { names: branchNames } = classifyThrow(branch);
      names.push(...branchNames);
    }
    return { kind: "conditional", names };
  }
  return { kind: "other", names: [] };
}

function extractCtorName(expr: ts.NewExpression): string {
  if (ts.isIdentifier(expr.expression)) return expr.expression.text;
  if (ts.isPropertyAccessExpression(expr.expression)) {
    return expr.expression.name.text;
  }
  return "";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function listTsFiles(dirAbs: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dirAbs)) {
    const full = resolve(dirAbs, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (entry.endsWith(".ts") && !entry.endsWith(".d.ts")) {
      out.push(full);
    }
  }
  return out;
}

// Expose readFileSync as a passthrough so callers can use a single import.
export { readFileSync };
