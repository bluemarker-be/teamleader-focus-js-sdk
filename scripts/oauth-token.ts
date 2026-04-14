/**
 * CLI helper to obtain Teamleader OAuth tokens during development.
 *
 * Usage:
 *   npx tsx scripts/oauth-token.ts
 *
 * What it does:
 *   1. Reads CLIENT_ID and CLIENT_SECRET from .env
 *   2. Starts a tiny local HTTP server on port 3000
 *   3. Opens the Teamleader authorization URL in your browser
 *   4. Catches the callback, exchanges the code for tokens
 *   5. Saves the tokens to .env (ACCESS_TOKEN / REFRESH_TOKEN)
 *
 * Prerequisites:
 *   - A Teamleader integration with redirect URI: http://localhost:3000/callback
 *   - A .env file with at least CLIENT_ID and CLIENT_SECRET
 */

import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ENV_PATH = resolve(ROOT, ".env");
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

// ---------------------------------------------------------------------------
// Read .env
// ---------------------------------------------------------------------------
function loadEnv(): Record<string, string> {
  if (!existsSync(ENV_PATH)) {
    console.error("❌ No .env file found. Create one with CLIENT_ID and CLIENT_SECRET.");
    process.exit(1);
  }
  const env: Record<string, string> = {};
  for (const line of readFileSync(ENV_PATH, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

function updateEnvValue(key: string, value: string): void {
  let content = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf-8") : "";
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content = content.trimEnd() + `\n${key}=${value}\n`;
  }
  writeFileSync(ENV_PATH, content, "utf-8");
}

// ---------------------------------------------------------------------------
// Open URL in default browser
// ---------------------------------------------------------------------------
function openBrowser(url: string): void {
  const cmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const env = loadEnv();
const clientId = env.CLIENT_ID;
const clientSecret = env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("❌ .env must contain CLIENT_ID and CLIENT_SECRET");
  process.exit(1);
}

// Build authorization URL
const authUrl = new URL("https://focus.teamleader.eu/oauth2/authorize");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");

// Start local server to catch the callback
const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (!url.pathname.startsWith("/callback")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400);
    res.end("Missing 'code' parameter");
    return;
  }

  console.log("\n✅ Authorization code received. Exchanging for tokens...");

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://focus.teamleader.eu/oauth2/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }).toString(),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      throw new Error(`Token exchange failed (${tokenRes.status}): ${errorText}`);
    }

    const tokens = (await tokenRes.json()) as {
      access_token: string;
      refresh_token: string;
      token_type: string;
      expires_in: number;
    };

    // Save to .env
    updateEnvValue("ACCESS_TOKEN", tokens.access_token);
    updateEnvValue("REFRESH_TOKEN", tokens.refresh_token);

    console.log("✅ Tokens saved to .env");
    console.log(`   Access token:  ${tokens.access_token.slice(0, 20)}...`);
    console.log(`   Refresh token: ${tokens.refresh_token.slice(0, 20)}...`);
    console.log(`   Expires in:    ${tokens.expires_in}s`);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html><body style="font-family:system-ui;text-align:center;padding:60px">
        <h1>✅ Tokens opgeslagen!</h1>
        <p>Je kunt dit venster sluiten en terug naar VS Code.</p>
      </body></html>
    `);
  } catch (err) {
    console.error("❌ Token exchange failed:", err);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<html><body><h1>❌ Fout</h1><pre>${String(err)}</pre></body></html>`);
  } finally {
    // Shut down after handling
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`\n🔑 Teamleader OAuth Token Helper\n`);
  console.log(`Redirect URI: ${REDIRECT_URI}`);
  console.log(`(zorg dat dit ook in je Teamleader integration staat)\n`);
  console.log(`Opening browser...\n`);
  openBrowser(authUrl.toString());
  console.log(`Als de browser niet opent, ga naar:\n${authUrl.toString()}\n`);
  console.log(`Wachten op callback...`);
});
