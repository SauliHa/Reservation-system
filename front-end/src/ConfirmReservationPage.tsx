import { useState } from "react";
import ReservationForm from "./ReservationForm";
import "./styles/reservationPage.css";
import { useLocation } from "react-router-dom";
import ReservationConfirmation from "./ReservationConfirmation";

interface selectedTime {
	laneName: string;
	startTime: number;
	endTime: number;
	laneId: string;
}

const ConfirmReservationPage = () => {
	const [showForm, setShowForm] = useState(true);
	const location = useLocation();
	const { selectedTimes, pickedDate } = location.state;
	const timesToFilter:Array<selectedTime> = selectedTimes;
	const reservationTimes = timesToFilter.filter(element => element.startTime !== 0);
	return  (
		<>
			{showForm ?
				<ReservationForm selectedTimes={reservationTimes} pickedDate={pickedDate} changePage={setShowForm}/> :
				<ReservationConfirmation selectedTimes={reservationTimes} pickedDate={pickedDate} />
			}
		
		
		</>
	);
};

export default ConfirmReservationPage;
