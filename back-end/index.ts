import express from "express";
import { createTables } from "./db";
import userRouter from "./userRouter";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use("/user", userRouter);

const { PORT } = process.env;
if (PORT) {
	server.listen(PORT, () => {
		console.log("Listening to port", PORT);
	});
} else {
	console.error("Port number is not provided.");
}
createTables();
