import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import argon2 from "argon2";

export const findUser = async (id: string) => {
	console.log(`Requesting a user with id ${id}...`);
	const query = "SELECT * FROM users WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

// interface userType {
// 	id: string;
// 	created_at: Date;
// 	password: string;
// }

export const checkEmail = async (email: string) => {
	const emailQuery = "SELECT * FROM users WHERE email = $1";
	const params = [email];
	const emailResult = await executeQuery(emailQuery, params);
	return emailResult;
};

export const createUser = async (username: string, password: string, email: string, phone_number: string, address: string) => {
	const id = uuidv4();
	const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
	const password_hash = await argon2.hash(password);
	const params = [id, created_at, username, email, password_hash, phone_number, address ];
	const query = 
    `INSERT INTO users (id, created_at, username, email, password_hash, phone_number, address) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING id`;
	console.log(`Inserting a new user ${params[0]}...`);
	const result = await executeQuery(query, params);
	return result;
};

export const deleteUser = async (id: string) => {
	console.log(`Deleting user with id ${id}...`);
	const query = "DELETE FROM users WHERE id = $1 RETURNING id"; //delete 	RETURNING id
	const params = [id];
	
	try {
		const result = await executeQuery(query, params);
		if (result.rowCount === 0) {
			console.log(`User with id ${id} not found.`);
			return result;
		}
		console.log(`User ${id} deleted successfully.`);
		return result;
	} catch (error) {
		console.error(`Error deleting user with id ${id}:`, error);
		throw error;
	}
};

export const updateUser = async (id: string, username: string, password: string, email: string, phone_number: string, address: string) => {
	console.log(`Updating user with id ${id}...`);

	const updates: string[] = [];
	const params: (string)[] = [id];
  
	if (username) {
		updates.push(`username = $${updates.length + 2}`);
		params.push(username);
	}
	if (password) {
		const hashedPassword = await argon2.hash(password);
		updates.push(`password_hash = $${updates.length + 2}`);
		params.push(hashedPassword);
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
  
	if (updates.length === 0) {
		throw new Error("No valid fields provided for update.");
	}
  
	const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $1`;
  

	try {
		const result = await executeQuery(query, params);
		if (result.rowCount === 0) {
			console.log(`User with id ${id} not found.`);
			return result;
		}
		console.log(`User ${id} updated successfully.`);
		return result;
	} catch (error) {
		console.error(`Error updating user with id ${id}:`, error);
		throw error;
	}
};