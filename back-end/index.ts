import express, { Request, Response } from "express";
import { createTables } from "./db";
import userRouter from "./userRouter";

const server = express();

server.use("/user", userRouter);
server.use(express.urlencoded({ extended: false }));

const { PORT } = process.env;
if (PORT) {
	server.listen(PORT, () => {
		console.log("Products API listening to port", PORT);
	});
} else {
	console.error("Port number is not provided.");
}
createTables();
