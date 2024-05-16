import pg, { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
dotenv.config(); // This can be omitted, if dotenv is initialized on startup

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const poolConfig = {
  host: PG_HOST,
  port: parseInt(PG_PORT || '5432', 10),
  user: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE
};

const pool = new pg.Pool(poolConfig);
console.log(pool);

const executeQuery = async (query: string, parameters?: any[]): Promise<QueryResult> => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, parameters);
    return result;
  } catch (error) {
    console.error(error.stack);
    error.name = "dbError";
    throw error;
  } finally {
    client.release();
  }
};

export const createTables = async (): Promise<void> => {
  const query = `
  CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY,
    "username" varchar,
    "created_at" timestamp,
    "email" varchar,
    "passwordHash" varchar,
    "phone_number" varchar,
    "address" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "reservation" (
    "id" uuid PRIMARY KEY,
    "userId" uuid,
    "trackId" uuid,
    "date" date,
    "startTime" datetime,
    "endTime" datetime,
    "amount_of_players" integer,
    "additional_info" varchar
  );
  
  CREATE TABLE "tracks" (
    "id" uuid PRIMARY KEY,
    "name" varchar,
    "usable" bool
  );
  
  ALTER TABLE "reservation" ADD CONSTRAINT "reservation_user" FOREIGN KEY ("userId") REFERENCES "users" ("id");
  
  ALTER TABLE "reservation" ADD CONSTRAINT "reservation_track" FOREIGN KEY ("trackId") REFERENCES "tracks" ("id");`;
  await executeQuery(query);
  console.log("Products table initialized");
};
