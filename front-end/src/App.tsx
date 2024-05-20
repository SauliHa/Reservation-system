import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import FrontPage from "./FrontPage";
import UserPage from "./UserPage";
import ReservationCalendarPage from "./ReservationCalendarPage";
import LoginPage from "./LoginPage";
import ConfirmReservationPage from "./ConfirmReservationPage";
import { Header } from "./Header";
import { Footer } from "./Footer";

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
