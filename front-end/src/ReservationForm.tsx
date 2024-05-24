import { Button, Form } from "react-bootstrap";
import { timeButton } from "./ReservationCalendarPage";
import { createReservation } from "./BackendService";
import { useContext, useState } from "react";
import { AppContext } from "./App";

const ReservationForm = ({selectedTimes, pickedDate}:PropsValidation) => {
	const context = useContext(AppContext);
	console.log(context.state);
	const [amountOfPlayers, setAmountOfPlayers] = useState(0);
	const [additionalInfo, setAdditionalInfo] = useState("");
	const renderDates = selectedTimes.map(element => {
		return <p key={element.laneId}>lane:{element.laneName} start time:{element.startTime} end time:{element.endTime}</p>;
	});

	const handleSubmit = (event:any) => {
		event.preventDefault();
		const dateString = `${pickedDate.getFullYear()}-${pickedDate.getMonth()+1}-${pickedDate.getDate()}`;
		createReservation("7f674c99-9895-4e02-8951-7da2f0bc70ef",selectedTimes[0].laneId, dateString, selectedTimes[0].startTime.toString(), selectedTimes[0].endTime.toString(), amountOfPlayers, additionalInfo);
	};

	return (
		<div className="container">
			{renderDates}
			<p>valitsit päivän {pickedDate.toDateString()}</p>
			<div className="reservationForm">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Pelaajien määrä</Form.Label>
						<Form.Control as="textarea" rows={1} 
							value={amountOfPlayers}
							onChange={() => setAmountOfPlayers(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Lisätietoja</Form.Label>
						<Form.Control as="textarea" rows={3} 
							value={additionalInfo}
							onChange={() => setAdditionalInfo(event.target.value)}/>
					</Form.Group>
					<Button variant="primary" type="submit">Lähetä</Button>
				</Form>
			</div>
		</div>

	);
};

interface PropsValidation {
	selectedTimes: Array<timeButton>;
	pickedDate: Date;
}

export default ReservationForm;