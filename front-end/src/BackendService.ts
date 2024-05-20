import axios from "axios";
//import dotenv from "dotenv";
import { User } from "./LoginPage";

//dotenv.config();

//const { PORT } = process.env;

const userBaseURL = "http://localhost:3000/user";

const createUser = (newUser: User) => {
	const request = axios.post(`${userBaseURL}/create`, newUser);
	return request.then((response) => response.data);
};

export default { createUser };
