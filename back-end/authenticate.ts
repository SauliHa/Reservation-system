import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: string;
	email: string;
	admin: boolean;
}


const authenticate = (req: Request, res: Response, next: NextFunction) => {
	console.log("Authenticating as a user");
	
	const auth = req.get("Authorization");
	if (!auth?.startsWith("Bearer")) {
		return res.status(401).send("Invalid token");
	}

	const token = auth.split(" ")[1];
	if (!token) {
		return res.status(401).send("Invalid token");
	}
	
	try {
		const secret: string | undefined = process.env.SECRET;
		if (secret === undefined) {
			return res.status(500);
		}
		jwt.verify(token, secret);
		next();
	} catch (error) {
		return res.status(401).send("Invalid token");
	}
};


const adminAuthenticate = (req: Request, res: Response, next: NextFunction) => {
	console.log("Authenticating as an admin");
	const auth = req.get("Authorization");
	console.log(auth);
	if (!auth?.startsWith("Bearer")) {
		return res.status(401).send("Invalid token");
	}
	const token = auth.split(" ")[1];
	console.log(token);
	if (!token) {
		return res.status(401).send("Invalid token");
	}
	try {
		const secret: string | undefined = process.env.SECRET;
		if (secret === undefined) {
			return res.status(500);
		}
		const decodedToken = jwt.verify(token, secret) as DecodedToken;
		if(!decodedToken.admin){
			return res.status(401).send("Invalid token");
		}
		next();
	} catch (error) {
		return res.status(401).send("Invalid token");
	}
};


export { authenticate, adminAuthenticate };