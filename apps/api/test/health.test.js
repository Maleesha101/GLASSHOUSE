import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

test("liveness endpoint reports the API process is running", async () => {
  const app = createApp({ pool: { query: async () => ({ rows: [{ "?column?": 1 }] }) } });
  const response = await request(app).get("/api/v1/health/live");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    status: "ok",
    service: "operations-api",
  });
});

test("readiness endpoint reports a healthy database", async () => {
  const app = createApp({ pool: { query: async () => ({ rows: [{ "?column?": 1 }] }) } });
  const response = await request(app).get("/api/v1/health/ready");

  assert.equal(response.status, 200);
  assert.equal(response.body.dependencies.database, "ok");
});

test("readiness endpoint returns 503 when the database is unavailable", async () => {
  const app = createApp({
    pool: {
      query: async () => {
        throw new Error("database unavailable");
      },
    },
  });
  const response = await request(app).get("/api/v1/health/ready");

  assert.equal(response.status, 503);
  assert.deepEqual(response.body.dependencies, { database: "unavailable" });
});

test("unknown API routes return a structured 404", async () => {
  const app = createApp({ pool: { query: async () => ({ rows: [] }) } });
  const response = await request(app).get("/api/v1/does-not-exist");

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "NOT_FOUND");
});
