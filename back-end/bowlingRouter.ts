import express from "express";
import { findAllLanes, findLane, findDate, createLane } from "./bowling-dao";

const bowlingRouter = express.Router();

bowlingRouter.get("/", async (req, res) => {
	const result = await findAllLanes();
	const lanes= result.rows;
	res.send(lanes);
});

bowlingRouter.get("/:id", async (req, res) => {
	const result = await findLane(req.params.id);
	const lane = result.rows;
	res.send(lane);
});

bowlingRouter.get("/date/:date", async (req, res) => {
	const result = await findDate(req.params.date);
	const dateinfo = result.rows;
	res.send(dateinfo);
});

bowlingRouter.post("/create", async (req, res) => {
	const {name} = req.body;
	const result = await createLane(name);
	res.send(result.rows[0]);
});

export default bowlingRouter;