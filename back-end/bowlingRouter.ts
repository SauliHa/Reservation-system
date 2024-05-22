import express from "express";
import {findLane} from "./bowling-dao";

const bowlingRouter = express.Router();

bowlingRouter.get("/:id", async (req, res) => {
	const result = await findLane(req.params.id);
	const lane = result.rows[0];
	res.send(lane);
});

export default bowlingRouter;