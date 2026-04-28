import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import config from "../config/index.js";

const schemaPath = fileURLToPath(new URL("./schema.sql", import.meta.url));

export const databasePath = path.resolve(config.database.path);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const db = new Database(databasePath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export const initializeDatabase = () => {
  const schema = fs.readFileSync(schemaPath, "utf8");
  db.exec(schema);
};

export const closeDatabase = () => {
  db.close();
};

initializeDatabase();

export default db;
