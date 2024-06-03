import { useContext, useState } from "react";

import "./styles/loginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AppContext } from "./App";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export interface User {
	id?: string;
	username?: string;
	password?: string;
	email?: string;
	phone_number?: string;
	address?: string;
	admin: boolean;
}

const LoginPage = () => {
	const {t} = useTranslation();
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
			<h3>{t("login-page.current-logged-in")} {userInfo.state.username}</h3>
			<Button style={{ width: "50%" }} onClick={logOut}>
				Log out
			</Button>
		</div>
	) : !registerMode ? (
		<LoginForm changeRegisterMode={changeRegisterMode} />
	) : (
		<>
			<LoginForm changeRegisterMode={changeRegisterMode} />
			<RegisterForm registerMode={registerMode} changeRegisterMode={changeRegisterMode} />
		</>
	);
};

export default LoginPage;
