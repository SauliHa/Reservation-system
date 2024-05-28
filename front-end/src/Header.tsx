import { Button } from "react-bootstrap";
import "./styles/header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";
import { useTranslation } from "react-i18next";

export function Header() {

	const { t } = useTranslation();
	const userInfo = useContext(AppContext);

	return (
		<div className="superheader">
			<h3 id="headerTitle">Super-sport bowling</h3>
			<div className="header">
				<li>
					<Link to="/" className="headerItem">
						{t("header.front-page")}
					</Link>
				</li>
				<li>
					<Link to="/user" className="headerItem">
						{t("header.user-page")}
					</Link>
				</li>
				<li>
					<Link to="/calendar" className="headerItem">
						{t("header.reservation-calendar")}
					</Link>
				</li>
				{userInfo.state.loggedIn && (
					<li className="userName">{userInfo.state.username}</li>
				)}
				<Link to="/login" id="loginButton">	
					<Button variant="dark">
						{userInfo.state.loggedIn ? t("header.log-out") : t("header.log-in")}
					</Button>
				</Link>
			</div>
		</div>
	);
}
