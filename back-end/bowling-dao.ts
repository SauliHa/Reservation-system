import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";

export const checkName = async (name: number) => {
	const nameQuery = "SELECT * FROM lanes WHERE name = $1";
	const params = [name];
	const nameResult = await executeQuery(nameQuery, params);
	return nameResult;
};

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
	const query = `SELECT r.start_time, r.end_time, l.id, l.name, r.user_id
    FROM reservations AS r
    JOIN lanes AS l ON r.lane_id = l.id
    WHERE r.date = $1;`;

	const params = [date];
	const result = await executeQuery(query, params);
	return result;
};

const createLane = async (name: string) => {
	const id: string = uuidv4();
	const usable: boolean = true;
	const params = [id, name, usable];
	const query = `INSERT INTO lanes (id, name, usable) 
    VALUES ($1, $2, $3) 
    RETURNING id`;
	console.log(`Inserting a new lane ${params[0]}...`);
	const result = await executeQuery(query, params);
	return result;
};

const deleteLane = async (id: string) => {
	console.log(`Deleting lane with id ${id}...`);
	const query = `WITH deleted_lane AS (
			DELETE FROM lanes WHERE id = $1 RETURNING id )
			DELETE FROM reservations WHERE lane_id = $1;`;
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

const updateLane = async (id: string, name: number, usable: boolean) => {
	console.log(`Updating lane with id ${id}...`);

	const updates: string[] = [];
	const params: (string | boolean | number)[] = [id];

	if (name) {
		updates.push(`name = $${updates.length + 2}`);
		params.push(name);
	}
	if (typeof usable !== "undefined") {
		updates.push(`usable = $${updates.length + 2}`);
		params.push(usable);
	}

	const query = `UPDATE lanes SET ${updates.join(", ")} WHERE id = $1`;

	try {
		const result = await executeQuery(query, params);
		if (result.rowCount === 0) {
			console.log(`Lane with id ${id} not found.`);
			return result;
		}
		console.log(`Lane ${id} updated successfully.`);
		return result;
	} catch (error) {
		console.error(`Error updating lane with id ${id}:`, error);
		throw error;
	}
};

export { findAllLanes, findLane, findDate, createLane, deleteLane, updateLane };
