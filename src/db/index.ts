import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database(process.env.DB_FILE_NAME!);
export const database = drizzle(sqlite);

export * from "../actions";
export * from "./types";
