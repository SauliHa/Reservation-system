import express from "express";
import { findAllLanes, findLane, findDate, createLane, deleteLane, updateLane, checkName} from "./bowling-dao";

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

	const checkedName = await checkName(name);
	if (checkedName.rows.length > 0) {
		res.status(401).send("This name is already in use");
		return;
	}
	const result = await createLane(name);
	res.send(result.rows[0]);
});

bowlingRouter.delete("/delete/:id", async (req, res) => {
	const laneId = req.params.id;
	console.log(`Request to delete lane with id ${laneId}`);
  
	try {
		const result = await deleteLane(laneId);
		if (result.rowCount === 0) {
			res.status(404).send("Error: Lane not found");
		} else {
			res.status(200).send(`Lane with id ${laneId} deleted successfully.`);
		}
	} catch (error) {
		res.status(500).send("Error deleting lane.");
	}
});

bowlingRouter.put("/:id", async (req, res) => {
	const {name, usable} = req.body;
	const laneId = req.params.id;

	const checkedName = await checkName(name);
	if (checkedName.rows.length > 0) {
		res.status(401).send("This name is already in use");
		return;
	}
	console.log(`Request to change lane with id ${laneId}`);

	try {
		const result = await updateLane(
			laneId,
			name,
			usable
		);
		if (result.rowCount === 0) {
			res.status(404).send("Error: Lane not found");
		} else {
			res.status(200).send(
				`Lane with id ${laneId} updated successfully.`
			);
		}
	} catch (error) {
		res.status(500).send("Error updating lane.");
	}
});


export default bowlingRouter;