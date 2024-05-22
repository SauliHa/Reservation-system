import { executeQuery } from "./db";

const findLane = async (id: string) => {
	console.log(`Requesting a lane with id ${id}...`);
	const query = "SELECT * FROM lanes WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

export { findLane };