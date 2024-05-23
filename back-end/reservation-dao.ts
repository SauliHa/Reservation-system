import { executeQuery } from "./db";

const findReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "SELECT * FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

const deleteReservation = async (id: string) => {
	console.log(`Requesting a reservation with id ${id}...`);
	const query = "DELETE * FROM reservations WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};


export { findReservation };