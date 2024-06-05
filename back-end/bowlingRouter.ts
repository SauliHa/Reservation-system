import express from "express";
import {
	findAllLanes,
	findLane,
	findDate,
	createLane,
	deleteLane,
	updateLane,
	checkName,
} from "./bowling-dao";
import { adminAuthenticate } from "./authenticate";

const bowlingRouter = express.Router();

bowlingRouter.get("/", async (req, res, next) => {
	try {
		const result = await findAllLanes();
		const lanes = result.rows;
		res.send(lanes);
	} catch (error) {
		next(error);
	}
});

bowlingRouter.get("/:id", async (req, res, next) => {
	try {
		const result = await findLane(req.params.id);
		const lane = result.rows;
		res.send(lane);
	} catch (error) {
		next(error);
	}
});

bowlingRouter.get("/date/:date", async (req, res, next) => {
	try {
		const result = await findDate(req.params.date);
		const dateinfo = result.rows;
		res.send(dateinfo);
	} catch (error) {
		next(error);
	}
});

bowlingRouter.post("/create", adminAuthenticate, async (req, res, next) => {
	const { name } = req.body;

	const checkedName = await checkName(name);
	if (checkedName.rows.length > 0) {
		res.status(401).send("This name is already in use");
		return;
	}
	try {
		const result = await createLane(name);
		res.status(201).send(result.rows[0]);
	} catch (error) {
		next(error);
	}
});

bowlingRouter.delete(
	"/delete/:id",
	adminAuthenticate,
	async (req, res, next) => {
		const laneId = req.params.id;
		console.log(`Request to delete lane with id ${laneId}`);

		try {
			const result = await deleteLane(laneId);
			if (result.rowCount === 0) {
				res.status(404).send("Error: Lane not found");
			} else {
				res.status(200).send(
					`Lane with id ${laneId} deleted successfully.`
				);
			}
		} catch (error) {
			next(error);
		}
	}
);

bowlingRouter.put("/:id", adminAuthenticate, async (req, res, next) => {
	const { name, usable } = req.body;
	const laneId = req.params.id;

	const checkedName = await checkName(name);
	if (checkedName.rows.length > 0) {
		res.status(401).send("This name is already in use");
		return;
	}
	console.log(`Request to change lane with id ${laneId}`);

	try {
		const result = await updateLane(laneId, name, usable);
		if (result.rowCount === 0) {
			res.status(404).send("Error: Lane not found");
		} else {
			res.status(200).send(
				`Lane with id ${laneId} updated successfully.`
			);
		}
	} catch (error) {
		next(error);
	}
});

export default bowlingRouter;
