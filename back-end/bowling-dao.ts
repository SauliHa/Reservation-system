import { executeQuery } from "./db";

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

export { findLane, findDate };