#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const envPath = path.join(rootDir, ".env");
const exampleEnvPath = path.join(rootDir, "example.env");

if (!fs.existsSync(envPath) && fs.existsSync(exampleEnvPath)) {
  fs.copyFileSync(exampleEnvPath, envPath);
  console.log("Created .env from example.env");
}

execSync("npm run db:init", {
  cwd: rootDir,
  stdio: "inherit",
});

console.log("Bug Intake Dashboard Study setup complete.");
