import { useContext, useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AppContext } from "./App";
import { Button } from "react-bootstrap";

export interface User {
	username: string;
	password: string;
	email: string;
	phone_number: string;
	address?: string;
}

const LoginPage = () => {
	const [registerMode, setRegisterMode] = useState(false);
	const userInfo = useContext(AppContext);

	const changeRegisterMode = (mode: boolean) => {
		setRegisterMode(mode);
	};

	const logOut = () => {
		localStorage.removeItem("token");
	};

	return userInfo.loggedIn ? (
		<Button className="w-25 p-3" onClick={logOut}>
			Log out
		</Button>
	) : !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} />
	) : (
		<RegisterForm changeRegisterMode={changeRegisterMode} />
	);
};

export default LoginPage;
