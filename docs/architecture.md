# Architecture

## Service boundaries

| Service | Responsibility | Trust level |
|---|---|---|
| Participant frontend | Challenge UI, hints, progress display | Untrusted client |
| Contractor workspace | Fictional vendor bulletin workflow | Intentionally vulnerable in M4 |
| Operations API | Synthetic identity, incident and audit APIs | Intentionally vulnerable CORS policy in M5 |
| Analyst browser worker | Reviews bulletins in a disposable browser | Isolated automation |
| Evidence vault | Stores synthetic incident artifacts | Separate service; controlled flaw in M6 |
| Challenge engine | Tracks stage completion and validates flags | Trusted control plane |
| PostgreSQL | Synthetic application state | Private network only |
| Nginx | Local host routing to lab services | Lab ingress |

## Intended attack narrative

1. Reconnaissance identifies a contractor workspace.
2. Unsafe bulletin rendering gives controlled script execution in that workspace origin.
3. The workspace origin is mistakenly trusted by the Operations API credentialed CORS policy.
4. A disposable synthetic analyst browser visits the bulletin while authenticated.
5. The browser can read selected synthetic incident and audit responses cross-origin.
6. Participants correlate those records with contractor-provided evidence.
7. A distinct evidence-export authorization defect permits retrieval of the synthetic archive.
8. The challenge engine validates outcomes and the final flag.

## Critical security distinctions

- CORS is a browser response-sharing policy; it is not authentication or server-side authorization.
- Credentialed CORS requires a specific allowed origin, not a wildcard, and browser cookie policy must also permit the cookie to be sent.
- Command-line HTTP clients can inspect headers but do not enforce browser CORS behavior. M5 must be tested in a real browser.
- The evidence-export flaw is independent of CORS and must have its own tests.
- The challenge engine validates outcomes server-side; visiting a URL or submitting a guessed flag must not grant stage completion.

## Local origin plan

Use local-only hostnames routed by Nginx, for example:
- console.glasshouse.test
- vendors.glasshouse.test
- api.glasshouse.test
- vault.glasshouse.test

These names are documentation targets until M2 configures local host routing. Do not configure public DNS for them.

## Network and process isolation

- Publish only the local reverse-proxy port during development.
- Keep PostgreSQL and internal service ports unpublished.
- Use a dedicated Docker network.
- Run application containers as non-root where practical.
- Do not mount the Docker socket or host home directory into the analyst browser.
- Apply browser navigation allowlists and outbound network restrictions.
- Use disposable browser contexts and synthetic-only cookies.
- Reset challenge state between teams.

## Data flow

The participant frontend never receives the analyst session cookie or final flag secret. The analyst worker owns its synthetic browser context. The worker reports narrowly scoped stage events to the challenge engine; the engine evaluates them and stores progress.
