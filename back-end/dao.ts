import { executeQuery } from "./db";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const findUser = async (id: string) => {
	console.log(`Requesting a user with id ${id}...`);
	const query = "SELECT * FROM users WHERE id = $1";
	const params = [id];
	const result = await executeQuery(query, params);
	return result;
};

interface userType {
	id: string;
	created_at: Date;
}

export const checkEmail = async (email: string) => {
	const emailQuery = "SELECT * FROM users WHERE email = $1";
	const params = [email];
	const emailResult = await executeQuery(emailQuery, params);
	console.log(emailResult);
	return emailResult;
};

export const createUser = async (user: userType) => {
	const id = uuidv4();
	const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
	const params = [id, created_at, ...Object.values(user)];
	const query = 
    `INSERT INTO users (id, created_at, username, email, password_hash, phone_number, address) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING id`;
	console.log(`Inserting a new user ${params[0]}...`);
	const result = await executeQuery(query, params);
	return result;
};
