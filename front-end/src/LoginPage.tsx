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
		userInfo.hook();
	};

	return userInfo.state.loggedIn ? (
		<div className="accountForm">
			<h3>
				You are currently logged in with email {userInfo.state.email}
			</h3>
			<Button style={{ width: "50%" }} onClick={logOut}>
				Log out
			</Button>
		</div>
	) : !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} />
	) : (
		<RegisterForm changeRegisterMode={changeRegisterMode} />
	);
};

export default LoginPage;
