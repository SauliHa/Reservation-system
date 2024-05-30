import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";

const findReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "SELECT * FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

const deleteReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "DELETE FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

const checkTime = async (lane_id: string, date: string, start_time: string, end_time: string) => {
	const params = [date, start_time, end_time, lane_id];
	const query = `SELECT * FROM reservations
	WHERE date = $1
	AND (
		(start_time < $2 AND end_time > $2) OR
		(start_time < $3 AND end_time > $3) OR
		(start_time >= $2 AND end_time <= $3)
	)
	AND
	lane_id = $4`;
	const result = await executeQuery(query, params);
	return result;
};

const getUserEmail = async (id: string) => {
	const params = [id];
	const query = "SELECT email FROM users WHERE id=$1";
	try { 
		const result = await executeQuery(query, params);
		return result.rows[0];
	} catch (error) {
		console.error(`Error finding user with ${id}:`, error);
		throw error;
	}
};

const createReservation = async (user_id: string, lane_id: string, date:string ,start_time: string, end_time: string, amount_of_players: number, additional_info: string) => {
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

export const updateReservation = async (id: string, lane_id: string, date:string ,start_time: string, end_time: string, amount_of_players: number, additional_info: string) => {
	console.log(`Updating reservation with id ${id}...`);

	const updates: string[] = [];
	const params: (string | number)[] = [id];
  
	if (lane_id) {
		updates.push(`lane_id = $${updates.length + 2}`);
		params.push(lane_id);
	}
	if (date) {
		updates.push(`date = $${updates.length + 2}`);
		params.push(date);
	}
	if (start_time) {
		updates.push(`start_time = $${updates.length + 2}`);
		params.push(start_time);
	}
	if (end_time) {
		updates.push(`end_time = $${updates.length + 2}`);
		params.push(end_time);
	}
	if (amount_of_players) {
		updates.push(`amount_of_players = $${updates.length + 2}`);
		params.push(amount_of_players);
	}
	if (additional_info) {
		updates.push(`additional_info = $${updates.length + 2}`);
		params.push(additional_info);
	}
	if (updates.length === 0) {
		throw new Error("No valid fields provided for update.");
	}
  
	const query = `UPDATE reservations SET ${updates.join(", ")} WHERE id = $1`;

	try {
		const result = await executeQuery(query, params);
		if (result.rowCount === 0) {
			console.log(`Reservation with id ${id} not found.`);
			return result;
		}
		console.log(`Reservation ${id} updated successfully.`);
		return result;
	} catch (error) {
		console.error(`Error updating reservation with id ${id}:`, error);
		throw error;
	}
};

export { findReservation, deleteReservation, createReservation, checkTime, getUserEmail };