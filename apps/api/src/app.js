import express from "express";

export function createApp({ pool }) {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/v1", (_request, response) => {
    response.json({
      name: "GLASSHOUSE Operations API",
      version: "v1",
      status: "online",
    });
  });

  app.get("/api/v1/health/live", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "operations-api",
    });
  });

  app.get("/api/v1/health/ready", async (_request, response) => {
    try {
      await pool.query("SELECT 1");
      response.status(200).json({
        status: "ok",
        service: "operations-api",
        dependencies: { database: "ok" },
      });
    } catch {
      response.status(503).json({
        status: "degraded",
        service: "operations-api",
        dependencies: { database: "unavailable" },
      });
    }
  });

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "The requested API resource does not exist.",
      },
    });
  });

  return app;
}
