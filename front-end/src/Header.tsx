import { Button } from "react-bootstrap";
import "./styles/header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function Header () {

	return (
		<div className="header">
			<div className="headerItem">
				<h3>Super-sport bowling</h3>
			</div>
			<div>
				<Link to="/" className="headerItem">Front page</Link>
				<Link to="/user" className="headerItem">Userpage</Link>
				<Link to="/calendar" className="headerItem">Reservation Calendar</Link>
				<Link to="/login" className="headerItem"><Button variant="dark">Log in</Button></Link>
			
			</div>
		</div>
	);
}