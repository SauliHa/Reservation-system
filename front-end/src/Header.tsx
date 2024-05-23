import { Button } from "react-bootstrap";
import "./styles/header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";

export function Header() {
	const userInfo = useContext(AppContext);

	return (
		<div className="superheader">
			<h3 id="headerTitle">Super-sport bowling</h3>
			<div className="header">
				<li>
					<Link to="/" className="headerItem">
						Front page
					</Link>
				</li>
				<li>
					<Link to="/user" className="headerItem">
						Userpage
					</Link>
				</li>
				<li>
					<Link to="/calendar" className="headerItem">
						Reservation Calendar
					</Link>
				</li>
				<Link to="/login" id="loginButton">
					<Button variant="dark">
						{userInfo.state.loggedIn ? "Log out" : "Log in"}
					</Button>
				</Link>
			</div>
		</div>
	);
}
