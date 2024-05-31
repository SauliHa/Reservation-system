import { Table } from "react-bootstrap";
import { timeButton } from "./ReservationCalendarPage";
import { useTranslation } from "react-i18next";

const ReservationConfirmation = ({selectedTimes, pickedDate}:PropsValidation) => {
	const {t} = useTranslation();
	const renderDates = selectedTimes.map(element => {
		return (
			<tr  key={element.laneId}>
				<th>{element.laneName}</th>
				<th>{element.startTime}:00</th>
				<th>{element.endTime}:00</th>
			</tr>);
	});

	return(
		<div className="container">
			<h1 className="mt-3 mb-3">{t("reservation-confirmation.reservation-successful")}</h1>
			<h3>{t("reservation-confirmation.reservation-dates")} {pickedDate.getDate()}-{pickedDate.getMonth()+1}-{pickedDate.getFullYear()}</h3>
			<div>
				<Table className="mb-5 mt-3">
					<thead>
						<tr>
							<th>{t("reservation-confirmation.track-name")}</th>
							<th>{t("reservation-confirmation.start-time")}</th>
							<th>{t("reservation-confirmation.end-time")}</th>
						</tr>
					</thead>
					<tbody>
						
						{renderDates}
						
					</tbody>
				</Table>
			</div>
		</div>
	);
};

interface PropsValidation {
	selectedTimes: Array<timeButton>;
	pickedDate: Date;
}

export default ReservationConfirmation;
