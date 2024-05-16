import express, { Request, Response } from "express";
//import * as dao from "./dao";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


const PORT  = 3000;
if (PORT) {
  server.listen(PORT, () => {
    console.log("Products API listening to port", PORT);
  });
} else {
  console.error("Port number is not provided.");
}