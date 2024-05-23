import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import FrontPage from "./FrontPage";
import UserPage from "./UserPage";
import ReservationCalendarPage from "./ReservationCalendarPage";
import LoginPage from "./LoginPage";
import ConfirmReservationPage from "./ConfirmReservationPage";
import { Header } from "./Header";
import { Footer } from "./Footer";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import BackendService from "./BackendService";

export const setAuthToken = (token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
	} else delete axios.defaults.headers.common["Authorization"];
};

export const AppContext = createContext({ id: "", email: "", loggedIn: false });

function App() {
	const [userInfo, setUserInfo] = useState({
		id: "",
		email: "",
		loggedIn: false,
	});

	const hook = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuthToken(token);
			const response = await BackendService.checkToken(token);
			if (response.error === "Invalid token") {
				localStorage.removeItem("token");
				return;
			}
			console.log(response);
			setUserInfo({
				id: response.id,
				email: response.email,
				loggedIn: true,
			});
		} else {
			setUserInfo({ id: "", email: "", loggedIn: false });
		}
	};
	useEffect(() => {
		hook();
	}, []);

	return (
		<AppContext.Provider value={userInfo}>
			<Router>
				<div className="content">
					<a id="top"></a>
					<Header />
					<Routes>
						<Route path="/" element={<FrontPage />} />
						<Route path="/user" element={<UserPage />} />
						<Route
							path="/calendar"
							element={<ReservationCalendarPage />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/confirm"
							element={<ConfirmReservationPage />}
						/>
					</Routes>
					<Footer />
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
