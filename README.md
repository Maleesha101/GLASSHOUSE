# GLASSHOUSE — Operation Glasshouse

An advanced, fictional web-security CTF challenge built around a chained application-security incident.

Participants investigate a smart-city platform breach by reconstructing how an untrusted contractor workspace became a trusted browser execution point, how a credentialed CORS policy exposed synthetic incident records, and how a separate evidence-export authorization flaw enabled retrieval of a final forensic artifact.

> **Safety boundary:** This project is a self-contained training lab. All identities, credentials, infrastructure records, and evidence are synthetic. The lab must not connect to real company systems, use real credentials, or expose vulnerable services to the public internet without explicit isolation controls.

## Challenge objectives

1. Discover the contractor workspace and trust-boundary weakness.
2. Identify unsafe bulletin rendering in the controlled workspace.
3. Demonstrate the impact of credentialed CORS using a disposable analyst browser and synthetic session.
4. Correlate incident and audit records.
5. Identify the independent evidence-export authorization flaw.
6. Reconstruct the synthetic evidence archive and submit the final flag.

CORS is the central vulnerability. It does not bypass server-side authorization; the evidence-export flaw is a separate weakness in the scenario.

## Planned stack

- Frontend: React + Vite
- API: Node.js + Express
- Database: PostgreSQL
- Browser simulation: Playwright
- Reverse proxy: Nginx
- Local orchestration: Docker Compose
- Tests: Vitest + Supertest + Playwright

## Repository status

The repository is being built incrementally. See [docs/roadmap.md](docs/roadmap.md) for milestones and [docs/architecture.md](docs/architecture.md) for the intended service boundaries.

## Safety and operating rules

- Use synthetic data only.
- Run the vulnerable services on an isolated Docker network.
- Do not mount the Docker socket into application or browser containers.
- Do not give the analyst browser access to host files, cloud metadata, or arbitrary external networks.
- Restrict browser egress to explicitly required lab services.
- Keep challenge flags and scoring secrets out of frontend bundles and public source fixtures.
- Never reuse real session cookies, API keys, or production data.
- Keep intentionally vulnerable behavior isolated from management and scoring components.

## Development

Local setup instructions will be added with the runnable application skeleton in M2.
