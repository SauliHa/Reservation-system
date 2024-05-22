import { useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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

	return !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} />
	) : (
		<RegisterForm changeRegisterMode={changeRegisterMode} />
	);
};

export default LoginPage;
