import { Pool } from "pg";
import { createApp } from "./app.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be configured");
}

const pool = new Pool({
  connectionString,
  max: 5,
  connectionTimeoutMillis: 3000,
  idleTimeoutMillis: 10000,
});

const app = createApp({ pool });
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`GLASSHOUSE Operations API listening on port ${port}`);
});

async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down gracefully`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
