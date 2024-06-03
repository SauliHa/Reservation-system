import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import argon2 from "argon2";

export const findUser = async (id: string) => {
	console.log(`Requesting a user with id ${id}...`);
	const query = "SELECT * FROM users WHERE id = $1";
	const params = [id];
	try{
		const result = await executeQuery(query, params);
		return result;
	}
	catch (error) {
		console.log(`Error finding user with id ${id}`);
		throw error;
	}
};

export const findAll = async () => {
	const query = "SELECT * FROM users";
	try{
		const result = await executeQuery(query);
		return result;
	}
	catch (error) {
		console.log(error);
		throw error;
	}
};

export const checkEmail = async (email: string) => {
	const emailQuery = "SELECT * FROM users WHERE email = $1";
	const params = [email];
	try {
		const emailResult = await executeQuery(emailQuery, params);
		return emailResult;
	} catch (error) {
		console.log(`Error finding user with email ${email}`);
		throw error;
	}
};

export const createUser = async (username: string, password: string, email: string, phone_number: string, address: string) => {
	const id = uuidv4();
	const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
	const password_hash = await argon2.hash(password);
	const params = [id, created_at, username, email, password_hash, phone_number, address];
	const query = 
    `INSERT INTO users (id, created_at, username, email, password_hash, phone_number, address) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING id`;
	console.log(`Inserting a new user ${params[0]}...`);
	try {
		const result = await executeQuery(query, params);
		return result;
	} catch (error) {
		console.error("Error creating user", error);
		throw error;
	}
};

export const deleteUser = async (id: string) => {
	
	console.log(`Deleting user with id ${id}...`);
	const query = `
		WITH deleted_user AS (
			DELETE FROM users WHERE id = $1 RETURNING id )
			DELETE FROM reservations WHERE user_id = $1;
	`;
	const params = [id];
	try {
		const result = await executeQuery(query, params);
		return result;
	} catch (error) {
		console.error(`Error deleting user with id ${id}:`, error);
		throw error;
	}
};

export const updateUser = async (id: string, username: string, password: string, email: string, phone_number: string, address: string, admin: boolean) => {
	console.log(`Updating user with id ${id}...`);

	const updates: (string | boolean)[] = [];
	const params: (string | boolean)[] = [id];
  
	if (username) {
		updates.push(`username = $${updates.length + 2}`);
		params.push(username);
	}
	if (password) {
		const password_hash = await argon2.hash(password);
		updates.push(`password_hash = $${updates.length + 2}`);
		params.push(password_hash);
	}
	if (email) {
		updates.push(`email = $${updates.length + 2}`);
		params.push(email);
	}
	if (phone_number) {
		updates.push(`phone_number = $${updates.length + 2}`);
		params.push(phone_number);
	}
	if (address) {
		updates.push(`address = $${updates.length + 2}`);
		params.push(address);
	}
	if (admin !== undefined) {
		updates.push(`admin = $${updates.length + 2}`);
		params.push(admin);
	}

	if (updates.length === 0) {
		throw new Error("No valid fields provided for update.");
	}

	const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $1`;
	try {
		const result = await executeQuery(query, params);
		return result;
	} catch (error) {
		console.error(`Error updating user with id ${id}:`, error);
		throw error;
	}
};

export const findReservations = async (id: string) => {
	console.log(`Requesting reservations with userId ${id}...`);
	const query = `SELECT reservations.id, reservations.date, reservations.start_time, 
				reservations.end_time, reservations.amount_of_players, reservations.additional_info,
					l.name	
				 FROM reservations 
				 JOIN lanes AS l on reservations.lane_id = l.id
				 WHERE reservations.user_id = $1;
				 `;
	const params = [id];

	try {
		const result = await executeQuery(query, params);
		return result;
	}
	catch (error) {
		console.error(`Error updating reservation with id ${id}:`, error);
		throw error;
	}
};