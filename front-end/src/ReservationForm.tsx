import { Button, Form } from "react-bootstrap";
import { timeButton } from "./ReservationCalendarPage";
import { createReservation } from "./BackendService";
import { useContext, useState } from "react";
import { AppContext } from "./App";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ReservationForm = ({selectedTimes, pickedDate, changePage}:PropsValidation) => {
	const {t} = useTranslation();
	const context = useContext(AppContext);
	const [amountOfPlayers, setAmountOfPlayers] = useState(0);
	const [additionalInfo, setAdditionalInfo] = useState("");
	const renderDates = selectedTimes.map(element => {
		return (
			<tr  key={element.laneId}>
				<th>{element.laneName}</th>
				<th>{element.startTime}:00</th>
				<th>{element.endTime}:00</th>
			</tr>);
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
			<h3 className="mt-3">{t("reservation-form.reservation-dates")} {pickedDate.getDate()}-{pickedDate.getMonth()+1}-{pickedDate.getFullYear()}</h3>
			<h3  className="mt-3">{t("reservation-form.reserved-lanes")}</h3>
			<div>
				<Table>
					<thead>
						<tr>
							<th>{t("reservation-form.track-name")}</th>
							<th>{t("reservation-form.start-time")}</th>
							<th>{t("reservation-form.end-time")}</th>
						</tr>
					</thead>
					<tbody>
						
						{renderDates}
						
					</tbody>
				</Table>
			</div>
			<div className="reservationForm mt-5">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>{t("reservation-form.players")}</Form.Label>
						<Form.Control as="textarea" rows={1} 
							value={amountOfPlayers}
							onChange={() => setAmountOfPlayers(event.target.value)}/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>{t("reservation-form.additional-info")}</Form.Label>
						<Form.Control as="textarea" rows={3} 
							value={additionalInfo}
							onChange={() => setAdditionalInfo(event.target.value)}/>
					</Form.Group>
					<Button variant="primary" type="submit" className="mb-4">{t("reservation-form.send")}</Button>
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