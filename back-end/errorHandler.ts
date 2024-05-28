import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(err: any, req: Request, res: Response, next: NextFunction ) { 
	console.error("Error:", err);
  
	if (res.headersSent) {
		return next(err);
	}
  
	if (err.name === "DatabaseError") {
		res.status(500).send("Internal Server Error");
	} else if (err.name === "ValidationError") {
		res.status(400).send("Bad Request");
	} else {
		res.status(500).send("Something went wrong");
	}
}
  
export default errorHandler;