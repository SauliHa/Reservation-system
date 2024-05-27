import { Table } from "react-bootstrap";
import { timeButton } from "./ReservationCalendarPage";

const ReservationConfirmation = ({selectedTimes, pickedDate}:PropsValidation) => {
	
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
			<h1 className="mt-4 mb-3">Varaus onnistui!</h1>
			<h3>Varauksien ajankohdat: {pickedDate.getDate()}-{pickedDate.getMonth()+1}-{pickedDate.getFullYear()}</h3>
			<div>
				<Table>
					<thead>
						<tr>
							<th>Radan nimi</th>
							<th>Varauksen aloitus</th>
							<th>Varaus päättyy</th>
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
