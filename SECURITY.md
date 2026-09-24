# Security policy

## Reporting a vulnerability

If you discover a security vulnerability in this SDK, please report it
privately.

**Do not open a public GitHub issue** — that exposes the vulnerability
to everyone before we can ship a fix.

Instead, email **henk@bluemarker.be** with:

- A description of the vulnerability
- Steps to reproduce (or a proof-of-concept if you have one)
- The affected SDK version(s)
- Your name/handle for credit (optional)

You should get an acknowledgment within 2 business days. We'll work
with you on a fix and coordinate the disclosure timeline.

## Scope

In scope for security reporting:

- Credential handling bugs (token leakage, incorrect OAuth flows)
- Injection vulnerabilities in request construction
- Any vulnerability that lets a caller with attacker-controlled input
  escape the SDK's contract

Out of scope:

- Vulnerabilities in the Teamleader Focus API itself — please report
  those to Teamleader directly at
  [support.focus@teamleader.eu](mailto:support.focus@teamleader.eu).
- Vulnerabilities in `devDependencies` — they don't ship to consumers.

## Supported versions

Only the latest MINOR release receives security fixes. Older versions
get a coordinated advisory but no patch backport.
