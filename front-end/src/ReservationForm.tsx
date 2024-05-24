import { Button, Form } from "react-bootstrap";
import { timeButton } from "./ReservationCalendarPage";
import { createReservation } from "./BackendService";
import { useContext, useState } from "react";
import { AppContext } from "./App";

const ReservationForm = ({selectedTimes, pickedDate, changePage}:PropsValidation) => {
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
		selectedTimes.forEach(element => {
			try {
				createReservation(context.state.id,element.laneId, dateString, element.startTime.toString(), element.endTime.toString(), amountOfPlayers, additionalInfo);
				changePage(false);
			} catch(error) {
				console.log((error));
			}
		});
		
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
	changePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default ReservationForm;