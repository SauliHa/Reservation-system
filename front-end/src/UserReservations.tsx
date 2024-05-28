import { useContext, useEffect } from "react";
import { getUserReservations } from "./BackendService";
import { AppContext } from "./App";
import { Table } from "react-bootstrap";

const UserReservations = () => {
	const userInfo = useContext(AppContext);

	useEffect(() => {
		getUserReservations(userInfo.state.id).then((response) => {
			console.log(response);
		});
	}, [userInfo]);

	return (
		<div className="userPageContainer">
			<Table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Start time</th>
						<th>End time</th>
						<th>Amount of players</th>
					</tr>
				</thead>
			</Table>
		</div>
	);
};

export default UserReservations;
