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
import { checkToken } from "./BackendService";

export const setAuthToken = (token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
	} else delete axios.defaults.headers.common["Authorization"];
};

const defaultState = {
	state: { id: "", email: "", username: "", loggedIn: false },
	hook: () => {},
};

export const AppContext = createContext(defaultState);

function App() {
	const [userInfo, setUserInfo] = useState(defaultState.state);

	const hook = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuthToken(token);
			const response = await checkToken(token);
			if (
				response === "Invalid token" ||
				response == "Error: Token expired"
			) {
				localStorage.removeItem("token");
				setUserInfo({
					id: "",
					email: "",
					username: "",
					loggedIn: false,
				});
				return;
			}
			console.log(response);
			setUserInfo({
				id: response.id,
				email: response.email,
				username: response.username,
				loggedIn: true,
			});
		} else {
			setUserInfo({ id: "", email: "", username: "", loggedIn: false });
		}
	};
	useEffect(() => {
		hook();
	}, []);

	return (
		<AppContext.Provider value={{ state: userInfo, hook: hook }}>
			<Router>
				<div className="content">
					<a id="top"></a>
					<Header/>
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
