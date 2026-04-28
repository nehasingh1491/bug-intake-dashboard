import { databasePath, initializeDatabase } from "./database.js";

initializeDatabase();

console.log(`SQLite database ready at ${databasePath}`);
