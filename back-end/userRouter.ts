import express from "express";
import * as dao from "./dao";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { validate, loginSchema, createUserSchema, updateUserSchema } from "./validate";
import argon2 from "argon2";
import { authenticate } from "./authenticate";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

const createToken = (id: string, username: string, email: string) => {
	const payload = { id, username, email };
	const secret = process.env.secret;
	const options = { expiresIn: "1h" };
	if (secret === undefined) {
		return;
	}
	const token = jwt.sign(payload, secret, options);
	return token;
};

userRouter.get("/:id", authenticate, async (req, res, next) => {
	try {const result = await dao.findUser(req.params.id);
		const user = result.rows[0];
		res.send(user);
	}
	catch (error) {
		next(error); 
	}
});

userRouter.post("/create", validate(createUserSchema), async (req, res, next) => {
	const { username, password, email, phone_number, address } = req.body;
	console.log(req.body);
	
	const checkedEmail = await dao.checkEmail(email);
	if (checkedEmail.rows.length > 0) {
		res.status(401).send("This email is already in use");
		return;
	}

	try {
		const result = await dao.createUser(
			username,
			password,
			email,
			phone_number,
			address
		);
		res.send(result.rows[0]);
	} catch (error) {
		next(error); 
	}
});

userRouter.post("/login", validate(loginSchema), async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const result = await dao.checkEmail(email);
		if (result.rows.length === 0) {
			res.status(404).send("E-mail not found");
		} else {
			const storedPassword = result.rows[0].password_hash;
			const passwordMatchesHash = await argon2.verify(
				storedPassword,
				password
			);

			if (passwordMatchesHash) {
				const id = result.rows[0].id;
				const username = result.rows[0].username;
				const token = createToken(id, username, email);
				console.log(token);
				res.send(token);
			} else {
				res.status(401).send("Unauthorized");
			}
		}
	}
	catch (error) {
		next(error); 
	}
});

userRouter.delete("/:id", authenticate, async (req, res, next) => {
	const userId = req.params.id;
	console.log(`Request to delete user with id ${userId}`);
	const checkId = await dao.findUser(userId);
	if (checkId.rowCount === 0) {
		res.status(404).send("Error: User not found");
	}
	
	try {
		await dao.deleteUser(userId);	
		res.status(200).send(
			`User with id ${userId} deleted successfully.`
		);
	} catch (error)  {
		next(error); 
	}
});

userRouter.put("/:id", authenticate, validate(updateUserSchema), async (req, res, next) => {
	const { username, password, email, phone_number, address } = req.body;
	const checkedEmail = await dao.checkEmail(email);
	if (checkedEmail.rows.length > 0) {
		res.status(401).send("This email is already in use");
		return;
	}
	const id = req.params.id;
	console.log(`Request to change user with id ${id}`);

	try {
		const result = await dao.updateUser(
			id,
			username,
			password,
			email,
			phone_number,
			address
		);
		if (result.rowCount === 0) {
			res.status(404).send("Error: User not found");
		} else {
			const token = createToken(id, username, email);
			res.status(200).send(token);
		}
	} catch (error) {
		next(error); 
	}
});

userRouter.get("/token/:token", async (req, res) => {
	const token = req.params.token;
	if (!token) {
		return res.status(401).send("Error: No token provided");
	}
	try {
		const secret: string | undefined = process.env.SECRET;
		if (secret === undefined) {
			return res.status(500);
		}
		const decoded = jwt.verify(token, secret);
		res.status(201).send(decoded);
	} catch (err) {
		console.log("Error: Invalid token", err);
		if (err instanceof TokenExpiredError) {
			return res.status(401).send("Error: Token expired");
		} else if (err instanceof JsonWebTokenError) {
			return res.status(400).send("Error: Invalid token");
		} else {
			return res.status(500).send("Internal server error");
		}
	}
});

userRouter.get("/:id/reservations", authenticate, async (req, res, next) => {
	try {
		const result = await dao.findReservations(req.params.id);
		const reservations = result.rows;
		res.send(reservations);
	} catch (error) {
		next(error); 
	}
});

export default userRouter;
