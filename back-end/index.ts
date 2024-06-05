import express from "express";
import { createTables } from "./db";
import userRouter from "./userRouter";
import bowlingRouter from "./bowlingRouter";
import cors from "cors";
import reservationRouter from "./reservationRouter";
import errorHandler from "./errorHandler";

export const server = express();

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use("/user", userRouter);
server.use("/bowling", bowlingRouter);
server.use("/reservations", reservationRouter);
server.use(errorHandler);

const { PORT } = process.env;
if (PORT) {
	server.listen(PORT, () => {
		console.log("Listening to port", PORT);
	});
} else {
	console.error("Port number is not provided.");
}
createTables();
