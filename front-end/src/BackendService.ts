import axios from "axios";
import { User } from "./LoginPage";

const userBaseURL = "http://localhost:3000/user";

const createUser = (newUser: User) => {
	const request = axios.post(`${userBaseURL}/create`, newUser);
	return request
		.then((response) => response.status)
		.catch((error) => error.response.status);
};

const login = (loginObject: { email: string; password: string }) => {
	const request = axios.post(`${userBaseURL}/login`, loginObject);
	return request
		.then((response) => response.status)
		.catch((error) => error.response.status);
};

export default { createUser, login };
