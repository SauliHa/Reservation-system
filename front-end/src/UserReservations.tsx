import { useContext, useEffect, useState } from "react";
import { deleteReservation, getUserReservations } from "./BackendService";
import { AppContext } from "./App";
import { Button, Table } from "react-bootstrap";

interface Reservation {
	id: string;
	date: Date;
	startTime: string;
	endTime: string;
	players: number;
	additionalInfo: string;
	laneName: string;
}
interface Reservations extends Array<Reservation> {}

const UserReservations = () => {
	const userInfo = useContext(AppContext);
	const [upcomingReservations, setUpcomingreservations] =
		useState<Reservations>([]);
	const [pastReservations, setPastReservations] = useState<Reservations>([]);

	const handleCancelClick = (id: string) => {
		deleteReservation(id).then((response) => {
			if (response === 200) {
				console.log("Deleted reservation successfully");
				updateReservations();
			}
		});
	};

	const updateReservations = () => {
		getUserReservations(userInfo.state.id).then((response) => {
			const reservations: Reservations = response.map(
				(reservation: {
					date: string | number | Date;
					start_time: string;
					id: string;
					end_time: string;
					amount_of_players: string;
					additional_info: string;
					name: string;
				}) => {
					const reservationDate = new Date(reservation.date);
					const hours = Number(reservation.start_time.slice(0, 2));
					reservationDate.setHours(hours);
					return {
						id: reservation.id,
						date: reservationDate,
						startTime: reservation.start_time,
						endTime: reservation.end_time,
						players: reservation.amount_of_players,
						additionalInfo: reservation.additional_info,
						laneName: reservation.name,
					};
				}
			);

			const today = new Date(Date.now());
			let pastReservationsList = reservations.filter(
				(reservation) => reservation.date < today
			);
			let upcomingReservationsList = reservations.filter(
				(reservation) => reservation.date > today
			);

			pastReservationsList = pastReservationsList.sort(
				(a: Reservation, b: Reservation) =>
					b.date.getTime() - a.date.getTime()
			);

			upcomingReservationsList = upcomingReservationsList.sort(
				(a: Reservation, b: Reservation) =>
					b.date.getTime() - a.date.getTime()
			);

			setUpcomingreservations(upcomingReservationsList);
			setPastReservations(pastReservationsList);
		});
	};

	useEffect(() => {
		updateReservations();
	}, [userInfo]);

	const upcomingReservationRows = upcomingReservations.map((reservation) => {
		return (
			<tr key={reservation.id}>
				<td>
					{reservation.date.getDate()}.{reservation.date.getMonth()}.
					{reservation.date.getFullYear()}
				</td>
				<td>{reservation.startTime}</td>
				<td>{reservation.endTime}</td>
				<td>{reservation.players}</td>
				<td>{reservation.additionalInfo}</td>
				<td>{reservation.laneName}</td>
				<td>
					<Button
						onClick={() => handleCancelClick(reservation.id)}
						variant="dark"
					>
						Cancel reservation
					</Button>
				</td>
			</tr>
		);
	});

	const pastReservationRows = pastReservations.map((reservation) => {
		return (
			<tr key={reservation.id}>
				<td>
					{reservation.date.getDate()}.{reservation.date.getMonth()}.
					{reservation.date.getFullYear()}
				</td>
				<td>{reservation.startTime}</td>
				<td>{reservation.endTime}</td>
				<td>{reservation.players}</td>
				<td>{reservation.additionalInfo}</td>
				<td>{reservation.laneName}</td>
			</tr>
		);
	});

	return (
		<div className="userPageContainer">
			<h3>Upcoming reservations</h3>
			<Table>
				<TableHeader />
				<tbody>{upcomingReservationRows}</tbody>
			</Table>
			<h3>Past reservations</h3>
			<Table>
				<TableHeader />
				<tbody>{pastReservationRows}</tbody>
			</Table>
		</div>
	);
};

const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Date</th>
				<th>Start time</th>
				<th>End time</th>
				<th>Amount of players</th>
				<th>Additional info</th>
				<th>Lane name</th>
			</tr>
		</thead>
	);
};

export default UserReservations;
