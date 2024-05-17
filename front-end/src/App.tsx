import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./App.css";
import FrontPage from "./FrontPage";
import UserPage from "./UserPage";
import ReservationCalendarPage from "./ReservationCalendarPage";
import LoginPage from "./LoginPage";
import ConfirmReservationPage from "./ConfirmReservationPage";

function App() {
	return (
		<Router>
			<div>
				<Link to="/">Front page</Link>
				<Link to="/user">Userpage</Link>
				<Link to="/calendar">Reservation Calendar</Link>
				<Link to="/login">Log in</Link>
			</div>
			<Routes>
				<Route path="/" element={<FrontPage />} />
				<Route path="/user" element={<UserPage />} />
				<Route path="/calendar" element={<ReservationCalendarPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/confirm" element={<ConfirmReservationPage />} />
			</Routes>
		</Router>
	);
}

export default App;
