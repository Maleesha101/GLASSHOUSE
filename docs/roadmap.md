# Development roadmap

## M1 — Project foundation
- Establish project purpose, safety boundary, architecture, and implementation sequence.
- Agree on service ownership and security invariants before intentionally vulnerable behavior.
- Deliverable: documentation and a reviewable foundation PR.

## M2 — Multi-service skeleton
- Add React/Vite participant interface.
- Add Express API with health/readiness endpoints.
- Add PostgreSQL and Nginx to local Docker Compose.
- Use a private Docker network and non-root containers.
- Deliverable: services start locally and health checks pass.

## M3 — Synthetic identity and incident data
- Add seeded analyst and contractor identities.
- Add synthetic sessions, incidents, audit events, and export metadata.
- Add authentication and role-aware API scaffolding.
- Deliverable: deterministic fixtures and API tests.

## M4 — Contractor workspace
- Add contractor bulletin workflow and analyst review queue.
- Introduce intentionally unsafe rendering only in the isolated challenge service.
- Add safe mode and reset path.
- Deliverable: reproducible browser-execution stage.

## M5 — CORS and analyst-browser simulation
- Add intentionally flawed origin trust policy to the challenge API.
- Add disposable Playwright analyst browser with synthetic session state.
- Constrain browser egress to lab services and report stage outcomes internally.
- Deliverable: browser-verified credentialed cross-origin read of synthetic data.

## M6 — Evidence export authorization flaw
- Add evidence export workflow and a separate deliberately flawed authorization decision.
- Keep the flaw limited to synthetic evidence.
- Deliverable: tests for intended role-check failure and corrected reference policy.

## M7 — Forensic archive and flag validation
- Assemble synthetic incident evidence.
- Add deterministic archive reconstruction and server-side flag validation.
- Keep flags out of frontend assets.
- Deliverable: complete challenge progression.

## M8 — End-to-end QA and deployment
- Run a fresh-team end-to-end solve.
- Verify reset, isolation, rate limits, logging, and failure paths.
- Document local deployment and safe hosting requirements.
- Deliverable: release candidate.

## Working agreement
- One milestone per feature branch and pull request.
- Do not begin the next milestone until the current PR is reviewed and merged.
- Add tests with each behavior.
- Never put real credentials or sensitive personal data in fixtures.
