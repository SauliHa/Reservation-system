import pg, {QueryResult } from "pg";
import dotenv from "dotenv";
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
	parameters?: Array<string | number | Date | boolean>
): Promise<QueryResult> => {
	const client = await pool.connect();
	try {
		const result = await client.query(query, parameters);
		return result;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  CREATE TABLE IF NOT EXISTS  "lanes" (
    "id" uuid PRIMARY KEY,
    "name" varchar,
    "usable" bool
  );
  
  CREATE TABLE IF NOT EXISTS "reservations" (
    "id" uuid PRIMARY KEY,
    "user_id" uuid,
    "lane_id" uuid,
    "date" date,
    "start_time" time,
    "end_time" time,
    "amount_of_players" integer,
    "additional_info" varchar,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lane_id) REFERENCES lanes(id)
  );
  `;
	await executeQuery(query);
  
	await addAdminColumn();
	console.log("Database tables initialized");

};

const addAdminColumn = async (): Promise<void> => {
	const addAdminQuery = `
    ALTER TABLE "users"
    ADD COLUMN IF NOT EXISTS "admin" boolean DEFAULT false;
  `;
	await executeQuery(addAdminQuery);
};

