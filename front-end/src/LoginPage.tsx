import { useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import BackendService from "./BackendService";

export interface User {
	username: string;
	password: string;
	email: string;
	phone_number: string;
	address?: string;
}

const LoginPage = () => {
	const [registerMode, setRegisterMode] = useState(false);

	const changeRegisterMode = (mode: boolean) => {
		setRegisterMode(mode);
	};

	const register = (
		username: string,
		password: string,
		email: string,
		phone: string,
		address: string
	) => {
		const newUser: User = {
			username: username,
			email: email,
			password: password,
			phone_number: phone,
			address: address,
		};
		BackendService.createUser(newUser);
	};

	const login = (username: string, password: string) => {
		const loginObject = { username: username, password: password };

		BackendService.login(loginObject);
	};

	return !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} login={login} />
	) : (
		<RegisterForm register={register} />
	);
};

export default LoginPage;
