import express from "express";
import * as dao from "./dao";
//import jwt from "jsonwebtoken";
import argon2 from "argon2";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
	const result = await dao.findUser(req.params.id);
	const user = result.rows[0];
	res.send(user);
});

userRouter.post("/create", async (req, res) => {
	const { username, password, email, phone_number, address} = req.body;
	console.log(req.body);

	const checkedEmail = await dao.checkEmail(email);
	if (checkedEmail.rows.length > 0) {
		res.status(401).send("This email is already in use");
		return;
	}

	const result = await dao.createUser(username, password, email, phone_number, address);
	res.send(result.rows[0]);
});

userRouter.post("/login", async (req, res) => {
//post user email and password to server, response id
	const { email, password } = req.body;
	// tähän väliin salasanan vertaus
	
	const passWordResult = await dao.comparePassword(email);
	const storedPassword = passWordResult.rows[0];

	const passwordMatchesHash = await argon2.verify(storedPassword, password);
	return passwordMatchesHash ? res.status(204).send("Password OK") : res.status(401).send("Unauthorized");
	// jos salasana on match, tehdään webtoken
	// const payload = { email };
	// const secret = process.env.SECRET;
	// const options = { expiresIn: "1h"};
	// const token = jwt.sign(payload, secret, options);
	//console.log(token);

	const result = await dao.logIn(email);
	res.send(result.rows[0]);

});

export default userRouter;	