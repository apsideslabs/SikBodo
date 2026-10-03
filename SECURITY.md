# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Report it privately through GitHub's
[private vulnerability reporting](https://github.com/apsideslabs/SikBodo/security/advisories/new)
form, or by email to the address on the maintainer's GitHub profile.

Please include what you found, how to reproduce it, and what you think the impact is. You can expect an
acknowledgement within a few days. This is a volunteer project, so a fix may take longer than a
commercial product's — you will be told either way.

---

## Threat model

SikBodo is a **static site**. That single fact removes most of the usual attack surface, and it is
worth being explicit about what does and does not exist here.

### What the project is

| Property | Value |
|---|---|
| Server-side code | **None** |
| Database | **None** |
| User accounts or authentication | **None** |
| Data collection, analytics or telemetry | **None** |
| Cookies | **None** |
| Third-party scripts, CDNs or web fonts | **None** |
| Network requests after page load | **Only the update check**, and only in the installed app — a same-origin `version.json` and GitHub's public releases API |
| Runtime dependencies | **None** |

### What is therefore out of scope

- Authentication bypass, session fixation, privilege escalation — there is no authentication.
- SQL injection, server-side request forgery, remote code execution — there is no server.
- Stored cross-site scripting via a database — there is no database.
- Data exfiltration of user records — no user records are collected.
- Supply-chain attacks through npm — there are no npm dependencies.

### What is genuinely in scope

| Area | Concern |
|---|---|
| **Client-side injection** | Content is rendered from `js/data/*.js` into the DOM. The renderers escape their input through an `esc()` helper; a gap there could allow markup injection from contributed content. Report any content string that renders as markup rather than text. |
| **Dependency drift** | The repository has no runtime dependencies, but CI does use GitHub Actions. A compromised or unpinned action is a real risk. |
| **Committed secrets** | A contributor could commit a credential. This is mitigated by secret scanning and push protection (below). |
| **Malicious contribution** | A pull request that adds an external script, a tracking beacon or a network call would break the project's core promise. This is the most likely vector for real harm here. |
| **The update check** | The installed app fetches `version.json` (same origin) and `https://api.github.com/.../releases/latest`. No user data is sent, the API is public and rate-limited, and the request is confined to `connect-src`. It is the only network traffic the project makes after load. |
| **Content integrity** | A wrong Bodo form is not a security issue, but deliberate misinformation in a language resource is a form of harm. Report it as a content issue. |

---

## Controls in place

- **GitHub secret scanning** — enabled on the repository.
- **Push protection** — enabled; commits containing detected secrets are blocked before they land.
- **CI secret scan** — `.github/workflows/ci.yml` runs a dependency-free grep for high-signal
  credential patterns (GitHub tokens, AWS access keys, private key headers, Slack tokens, Stripe live
  keys) on every push and pull request.
- **Pinned Actions** — workflows use `actions/checkout@v4` and `actions/setup-node@v4`;
  Dependabot keeps them current.
- **Least privilege in CI** — the workflow declares `permissions: contents: read` and has no deploy job.
- **No secrets in the codebase** — nothing in this repository requires a credential to run, and none is
  hardcoded.

---

## Security headers

The repository ships a [`_headers`](_headers) file containing a strict Content Security Policy and the
usual hardening headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, `Cross-Origin-*`, HSTS).

**Important:** GitHub Pages **ignores** `_headers`. On the live site those headers are therefore *not*
applied, and the policy in that file is a statement of intent plus a ready-made configuration for any
host that does support it (Netlify, Cloudflare Pages). The mitigations that *do* apply on GitHub Pages
are the absence of a server, the absence of any third-party script, and the escaping performed by the
renderers.

The CSP is deliberately strict: `default-src 'none'`, `script-src 'self'`, `worker-src 'self'`,
`frame-ancestors 'none'`, and `connect-src 'self' https://api.github.com` (the two update checks).
`style-src` includes `'unsafe-inline'` because the display panel writes CSS custom properties onto
`<html>`; scripts are external files only, with no inline script anywhere.

---

## Supported versions

Only the latest release is supported. Security fixes are made on `main` and released as a patch version
— see [CHANGELOG.md](CHANGELOG.md).
