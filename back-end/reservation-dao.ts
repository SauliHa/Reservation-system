import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";

const findReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "SELECT * FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

/*const deleteReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "DELETE * FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};*/



export const createReservation = async (user_id: string, lane_id: string, date:string ,start_time: string, end_time: string, amount_of_players: number, additional_info: string) => {
	const id = uuidv4();
	const params = [id, user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info];
	const query = 
    `INSERT INTO reservations (id, user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING id`;
	console.log(`Inserting a new reservation ${params[0]}...`);

	try {
		const result = await executeQuery(query, params);
		return result;
	} catch (error) {
		console.error(`Error inserting reservation with id ${id}:`, error);
		throw error;
	}
};

export { findReservation };