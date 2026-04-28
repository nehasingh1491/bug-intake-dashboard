// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config({ quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiHost = process.env.HOST || "127.0.0.1";
const apiPort = process.env.PORT || "8080";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    assetsDir: "",
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: false,
    strictPort: false,
    proxy: {
      "/api": `http://${apiHost}:${apiPort}`,
    },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
