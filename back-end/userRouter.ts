import express from "express";
import * as dao from "./dao";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
	const result = await dao.findUser(req.params.id);
	const user = result.rows[0];
	res.send(user);
});

userRouter.post("/create", async (req, res) => {
	const { username, password, email, phone_number, address } = req.body;
	console.log(req.body);

	const checkedEmail = await dao.checkEmail(email);
	if (checkedEmail.rows.length > 0) {
		res.status(401).send("This email is already in use");
		return;
	}

	const result = await dao.createUser(
		username,
		password,
		email,
		phone_number,
		address
	);
	res.send(result.rows[0]);
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const result = await dao.comparePassword(email);
	const storedPassword = result.rows[0].password_hash;
	const passwordMatchesHash = await argon2.verify(storedPassword, password);

	if (passwordMatchesHash) {
		const payload: string = email.toString();
		const secret: string | undefined = process.env.SECRET;
		//const options = { expiresIn: "1h"};
		if (secret === undefined) {
			res.status(401).send("The secret is undefined");
			return;
		}
		const token = jwt.sign(payload, secret);
		console.log(token);
		res.send(token);
	} else {
		res.status(401).send("Unauthorized");
	}
});

userRouter.delete("/delete/:id", async (req, res) => {
	const userId = req.params.id;
	console.log(`Request to delete user with id ${userId}`);

	try {
		const result = await dao.deleteUser(userId);
		if (result.rowCount === 0) {
			res.status(404).send("Error: User not found");
		} else {
			res.status(200).send(
				`User with id ${userId} deleted successfully.`
			);
		}
	} catch (error) {
		res.status(500).send("Error deleting user.");
	}
});

userRouter.put("/put/:id", async (req, res) => {
	const { username, password, email, phone_number, address } = req.body;

	const checkedEmail = await dao.checkEmail(email);
	if (checkedEmail.rows.length > 0) {
		res.status(401).send("This email is already in use");
		return;
	}
	const userId = req.params.id;
	console.log(`Request to change user with id ${userId}`);

	try {
		const result = await dao.updateUser(
			userId,
			username,
			password,
			email,
			phone_number,
			address
		);
		if (result.rowCount === 0) {
			res.status(404).send("Error: User not found");
		} else {
			res.status(200).send(
				`User with id ${userId} updated successfully.`
			);
		}
	} catch (error) {
		res.status(500).send("Error updating user.");
	}
});

export default userRouter;
