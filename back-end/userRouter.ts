import express from "express";
import * as dao from "./dao";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
	const result = await dao.findUser(req.params.id);
	const user = result.rows[0];
	res.send(user);
});

userRouter.post("/:create", async (req, res) => {
	const user = req.body;
	console.log(req.body);
	const result = await dao.createUser(user);
	res.send(result.rows[0]);
});

export default userRouter;