import { useContext, useEffect, useState } from "react";
import { getUserReservations } from "./BackendService";
import { AppContext } from "./App";
import { Table } from "react-bootstrap";

const UserReservations = () => {
	const userInfo = useContext(AppContext);
	const [upcomingReservations, setUpcomingreservations] = useState([]);
	const [pastReservations, setPastReservations] = useState([]);

	useEffect(() => {
		getUserReservations(userInfo.state.id).then((response) => {
			const today = new Date(Date.now());
		});
	}, [userInfo]);

	return (
		<div className="userPageContainer">
			<h3>Upcoming reservations</h3>
			<Table>
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
				<tbody></tbody>
			</Table>
			<h3>Past reservations</h3>
			<Table>
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
				<tbody></tbody>
			</Table>
		</div>
	);
};

export default UserReservations;
