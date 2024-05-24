import ReservationForm from "./ReservationForm";
import "./styles/reservationPage.css";
import { useLocation } from "react-router-dom";

const ConfirmReservationPage = () => {
	const location = useLocation();
	const { selectedTimes, pickedDate } = location.state;
	const reservationTimes = selectedTimes.filter(element => element.startTime !== 0);
	console.log(pickedDate);
	console.log(reservationTimes);
	return  (
		<ReservationForm selectedTimes={reservationTimes} pickedDate={pickedDate}/>
	);
};

export default ConfirmReservationPage;
