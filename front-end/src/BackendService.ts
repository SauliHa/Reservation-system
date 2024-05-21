import axios from "axios";
import { User } from "./LoginPage";

const userBaseURL = "http://localhost:3000/user";

const createUser = (newUser: User) => {
	const request = axios.post(`${userBaseURL}/create`, newUser);
	return request.then((response) => response.data);
};

export default { createUser };
