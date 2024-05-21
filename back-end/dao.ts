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
	console.log(emailResult);
	return emailResult;
};

export const createUser = async (username: string, password: string, email: string, phone_number: string, address: string) => {
	const id = uuidv4();
	const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
	const password_hash = await argon2.hash(password);
	const params = [id, created_at, username, email, password_hash, phone_number, address ]; //...Object.values(user)
	const query = 
    `INSERT INTO users (id, created_at, username, email, password_hash, phone_number, address) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING id`;
	console.log(`Inserting a new user ${params[0]}...`);
	const result = await executeQuery(query, params);
	return result;
};

export const comparePassword = async (email: string) => {
	const params = [email];
	const query =  "SELECT * FROM users WHERE email = $1";
	const result = await executeQuery (query, params);
	return result;
};

