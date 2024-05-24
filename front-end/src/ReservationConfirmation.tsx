import { timeButton } from "./ReservationCalendarPage";

const ReservationConfirmation = ({selectedTimes, pickedDate}:PropsValidation) => {
	const renderDates = selectedTimes.map(element => {
		return <p key={element.laneId}>lane:{element.laneName} start time:{element.startTime} end time:{element.endTime}</p>;
	});

	return(
		<div className="container">
			<h1 className="mt-4 mb-3">Reservation successful!</h1>
			<p>{renderDates}</p>
		</div>
	);
};

interface PropsValidation {
	selectedTimes: Array<timeButton>;
	pickedDate: Date;
}

export default ReservationConfirmation;
