import pg, { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
import exp from "constants";
dotenv.config(); // This can be omitted, if dotenv is initialized on startup


const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const poolConfig = {
	host: PG_HOST,
	port: parseInt(PG_PORT || "5432", 10),
	user: PG_USERNAME,
	password: PG_PASSWORD,
	database: PG_DATABASE,
};

const pool = new pg.Pool(poolConfig);
console.log(pool);

export const executeQuery = async (
	query: string,
	parameters?: any[]
): Promise<QueryResult> => {
	const client = await pool.connect();
	try {
		const result = await client.query(query, parameters);
		return result;
	} catch (error: any) {
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
    "password_hash" varchar,
    "phone_number" varchar,
    "address" varchar
  );  

  CREATE TABLE IF NOT EXISTS  "tracks" (
    "id" uuid PRIMARY KEY,
    "name" varchar,
    "usable" bool
  );
  
  CREATE TABLE IF NOT EXISTS "reservations" (
    "id" uuid PRIMARY KEY,
    "user_id" uuid,
    "track_id" uuid,
    "date" date,
    "start_time" time,
    "end_time" time,
    "amount_of_players" integer,
    "additional_info" varchar,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id)
  );
  `;
	await executeQuery(query);
	console.log("Database tables initialized");
};
