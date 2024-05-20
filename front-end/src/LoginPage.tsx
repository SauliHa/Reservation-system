import { useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import BackendService from "./BackendService";

export interface User {
	username: string;
	password_hash: string;
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
			password_hash: password,
			phone_number: phone,
			address: address,
		};
		console.log("testi");
		const createdUser = BackendService.createUser(newUser);
		console.log(createdUser);
	};

	const login = (username: string, password: string) => {
		//todo: lisää tähän kutsu backendiin ja poista tämä placeholderina toimiva console.log
		console.log("Login, username: " + username + ", password: " + password);
	};

	return !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} login={login} />
	) : (
		<RegisterForm register={register} />
	);
};

export default LoginPage;
