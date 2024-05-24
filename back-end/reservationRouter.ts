import express from "express";
import {findReservation, createReservation, deleteReservation, updateReservation, checkTime} from "./reservation-dao";

const reservationRouter = express.Router();

reservationRouter.get("/:id", async (req, res) => {
	const result = await findReservation(req.params.id);
	const reservation = result.rows[0];
	res.send(reservation);
});

reservationRouter.post("/create", async (req, res) => {
	const {user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info} = req.body;
	console.log(req.body);
	const timeChecked = await checkTime(lane_id, date, start_time, end_time);
	if ( timeChecked.rows.length > 0 ) {
		return res.send("Chosen time is not available");
	}
	try {
		const result = await createReservation(user_id, lane_id, date, start_time, end_time, amount_of_players, additional_info);
		res.status(201).send(result.rows[0]);
	} catch (error) {
		console.error("Error creating reservation:", error);
		res.status(500).send("Error creating reservation");
	}
});

reservationRouter.delete("/delete/:id", async (req, res) => {
	const reservationId = req.params.id;
	console.log(`Request to delete resevation with id ${reservationId}`);
  
	try {
		const result = await deleteReservation(reservationId);
		if (result.rowCount === 0) {
			res.status(404).send("Error: Reservation not found");
		} else {
			res.status(200).send(`Reservation with id ${reservationId} deleted successfully.`);
		}
	} catch (error) {
		res.status(500).send("Error deleting reservation.");
	}
});

reservationRouter.put("/put/:id", async (req, res) => {
	const {lane_id, date, start_time, end_time, amount_of_players, additional_info} = req.body;
	const reservationId = req.params.id;
	console.log(`Request to change reservation with id ${reservationId}`);
  
	try {
		const result = await updateReservation(reservationId, lane_id, date, start_time, end_time, amount_of_players, additional_info);
		if (result.rowCount === 0) {
			res.status(404).send("Error: Reservation not found");
		} else {
			res.status(200).send(`Reservation with id ${reservationId} updated successfully.`);
		}
	} catch (error) {
		res.status(500).send("Error updating reservation.");
	}
});

export default reservationRouter;