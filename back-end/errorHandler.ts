import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(err: any, req: Request, res: Response, next: NextFunction ) { 
	console.error("Error:", err);
  
	if (res.headersSent) {
		return next(err);
	}

	if (err.name === "dbError")
		res.status(500).send("Database error");
	else if (err.name === "validationError") {
		res.status(400).send("Validation error");
	} else {
		res.status(500).send("Something went wrong");
	}
}
  
export default errorHandler;