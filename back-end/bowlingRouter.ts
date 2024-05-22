import express from "express";
import { findAllLanes, findLane, findDate } from "./bowling-dao";

const bowlingRouter = express.Router();

bowlingRouter.get("/", async (req, res) => {
	const result = await findAllLanes();
	const lanes= result.rows[0];
	res.send(lanes);
});

bowlingRouter.get("/:id", async (req, res) => {
	const result = await findLane(req.params.id);
	const lane = result.rows[0];
	res.send(lane);
});

bowlingRouter.get("/date/:date", async (req, res) => {
	const result = await findDate(req.params.date);
	const dateinfo = result.rows[0];
	res.send(dateinfo);
});


export default bowlingRouter;