import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";

const findAllLanes = async () => {
	console.log("Requesting all lanes...");
	const query = "SELECT * FROM lanes";
	const result = await executeQuery(query);
	return result;
};

const findLane = async (id: string) => {
	console.log(`Requesting a lane with id ${id}...`);
	const query = "SELECT * FROM lanes WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

const findDate = async (date: string) => {
	console.log(`Requesting date info for ${date}...`);
	const query = `SELECT r.start_time, r.end_time, l.id, l.name
    FROM reservations AS r
    JOIN lanes AS l ON r.lane_id = l.id
    WHERE r.date = $1;`;
    
	const params = [date];
	const result = await executeQuery(query, params);
	return result;
};

const createLane = async (name: number) => {
	const id: string = uuidv4();
	const usable: string = "true";
	const params = [id, name, usable];
	const query = 
    `INSERT INTO lanes (id, name, usable) 
    VALUES ($1, $2, $3) 
    RETURNING id`;
	console.log(`Inserting a new lane ${params[0]}...`);
	const result = await executeQuery(query, params);
	return result;
};

const deleteLane = async (id: string) => {
	console.log(`Deleting lane with id ${id}...`);
	const query = "DELETE FROM lanes WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

export { findAllLanes, findLane, findDate, createLane, deleteLane};