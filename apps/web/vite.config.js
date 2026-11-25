import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep Vite's dependency-optimizer cache outside the workspace node_modules
  // tree, which may be owned by root in the container.
  cacheDir: "/tmp/glasshouse-vite-cache",
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [".glasshouse.test", "localhost"],
    hmr: { clientPort: 8080 },
  },
});
