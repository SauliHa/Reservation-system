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
			return;
		}
		const token = jwt.sign(payload, secret);
		console.log(token);
		res.send(result.rows[0].id);
	} else {
		res.status(401).send("Unauthorized");
	}
});

export default userRouter;
