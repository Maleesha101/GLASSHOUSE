# Local development — M2

## Requirements

- Docker Engine and Docker Compose v2
- Git
- A browser

The Docker stack uses Node.js 22, PostgreSQL 17, and Nginx. You do not need Node.js installed on the host to run the stack.

## 1. Configure environment

From the repository root:

```bash
cp .env.example .env
```

Change `POSTGRES_PASSWORD` in `.env` to a unique local-only value. Do not commit `.env`.

## 2. Configure local hostnames

Add the following line to your hosts file:

```text
127.0.0.1 console.glasshouse.test vendors.glasshouse.test api.glasshouse.test vault.glasshouse.test
```

Linux/macOS: edit `/etc/hosts`. Windows: edit `C:\\Windows\\System32\\drivers\\etc\\hosts` as Administrator.

## 3. Start the stack

```bash
docker compose up --build -d
docker compose ps
```

Open:

- http://localhost:8080/ — Operations Console
- http://console.glasshouse.test:8080/ — Operations Console
- http://vendors.glasshouse.test:8080/ — Vendor Workspace placeholder
- http://vault.glasshouse.test:8080/ — Evidence Vault placeholder
- http://api.glasshouse.test:8080/api/v1 — Operations API

The API health endpoints are:

- `GET /api/v1/health/live`
- `GET /api/v1/health/ready`

## 4. Verify

```bash
curl -i http://localhost:8080/api/v1/health/live
curl -i http://localhost:8080/api/v1/health/ready
docker compose logs --tail=100 api postgres nginx web
```

The readiness endpoint checks PostgreSQL with a lightweight query. It returns HTTP 503 if the database is unavailable.

## 5. Run API tests

```bash
npm install
npm test
```

Tests use a stubbed database pool and do not require Docker or a running PostgreSQL instance.

## 6. Stop and reset

Stop containers while retaining the database volume:

```bash
docker compose down
```

Delete the local database volume as well (destructive; removes all local database data):

```bash
docker compose down -v
```

## Network boundary

Only Nginx is published, and it binds to `127.0.0.1`. PostgreSQL, the API, and the web container are reachable only on the private Docker network. The Docker network is marked internal. Do not change the port binding to `0.0.0.0` or deploy this vulnerable training project publicly without a separate security review.
