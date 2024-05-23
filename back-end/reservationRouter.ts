import express from "express";
import {findReservation} from "./reservation-dao";

const reservationRouter = express.Router();

reservationRouter.get("/:id", async (req, res) => {
	const result = await findReservation(req.params.id);
	const reservation = result.rows[0];
	res.send(reservation);
});



reservationRouter.post("/create", async (req, res) => {
	const {userId, players, start_time, end_time} = req.body;
	console.log(req.body);

	const result = await dao.createReservation(userId, players, start_time, end_time);
	res.send(result.rows[0]);
});

export default reservationRouter;