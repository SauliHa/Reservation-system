import { useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
	const [registerMode, setRegisterMode] = useState(false);

	const changeRegisterMode = (mode: boolean) => {
		setRegisterMode(mode);
	};

	const register = (username: string, password: string) => {
		//todo: lisää tähän kutsu backendiin ja poista tämä placeholderina toimiva console.log
		console.log(
			"Register, username: " + username + ", password: " + password
		);
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
