import express from "express";
import {findReservation, createReservation} from "./reservation-dao";

const reservationRouter = express.Router();

reservationRouter.get("/:id", async (req, res) => {
	const result = await findReservation(req.params.id);
	const reservation = result.rows[0];
	res.send(reservation);
});



reservationRouter.post("/create", async (req, res) => {
	const {user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info} = req.body;
	console.log(req.body);

	try {
		const result = await createReservation(user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info);
		res.status(201).send(result.rows[0]);
	} catch (error) {
		console.error("Error creating reservation:", error);
		res.status(500).send("Error creating reservation");
	}
});

export default reservationRouter;