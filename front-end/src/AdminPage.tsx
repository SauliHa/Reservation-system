import { useEffect, useState, useContext } from "react";
import {
	editLane,
	getLanes,
	getAllUsers,
	sendEditUserRequest,
	sendDeleteUserRequest,
	getAllReservations,
	deleteReservation,
	createLane,
} from "./BackendService";
import "./styles/adminpage.css";
import { Button, Form, Table, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "./App";
import { useMediaQuery } from "react-responsive";

interface Lane {
	id: string;
	name: string;
	usable: boolean;
}

interface User {
	id: string;
	username?: string;
	password?: string;
	email?: string;
	phone_number?: string;
	address?: string;
	admin?: boolean;
}

interface Reservation {
	id: string;
	user_id: string;
	date: Date;
	start_time: string;
	end_time: string;
	amount_of_players?: number;
	additional_info?: string;
	name: string;
	username?: string;
}

const AdminPage = () => {
	const isTabletOrMobile = useMediaQuery({ maxWidth: 900 });
	const [lanes, setLanes] = useState<Lane[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const userInfo = useContext(AppContext);
	const [upcomingReservations, setUpcomingreservations] =
		useState<Reservations>([]);
	const [pastReservations, setPastReservations] = useState<Reservations>([]);
	interface Reservations extends Array<Reservation> {}

	const getLaneInfo = () => {
		getLanes().then((response) => {
			setLanes(response.data);
		});
	};

	const handleLaneEdit = (lane: Lane, name: string, usable: boolean) => {
		if (name !== lane.name) {
			editLane(lane.id, usable, name).then((response) => {
				if (response === 200) {
					getLaneInfo();
				}
			});
		} else {
			editLane(lane.id, usable).then((response) => {
				if (response === 200) {
					getLaneInfo();
				}
			});
		}
	};

	const handleAddLane = (laneName: string) => {
		createLane(laneName).then((response) => {
			if (response === 201) {
				getLaneInfo();
			}
		});
	};

	const laneRows = lanes.map((lane) => {
		return <LaneRow key={lane.id} lane={lane} edit={handleLaneEdit} />;
	});

	const getUserInfo = () => {
		getAllUsers().then((response) => {
			setUsers(response.data);
		});
	};

	const handleUserEdit = (user: User) => {
		const editedUser = { id: user.id, admin: user.admin };
		sendEditUserRequest(editedUser).then((response) => {
			if (response.status === 200) {
				getUserInfo();
			}
		});
	};

	const handleDeleteUser = (user: User) => {
		const id: string = user.id;
		setUsers((prevUsers) =>
			prevUsers.filter((targetUser) => targetUser.id !== id)
		);
		sendDeleteUserRequest(id).then((response) => {
			if (response.status === 200) {
				getUserInfo();
			} else {
				// If the delete request fails, revert the state update
				getUserInfo();
			}
		});
	};

	const usersTable = users.map((user) => {
		return (
			<UsersRow
				key={user.id}
				user={user}
				edit={handleUserEdit}
				delete={handleDeleteUser}
			/>
		);
	});

	const getReservations = () => {
		getAllReservations().then((response) => {
			const reservations = response.data.map(
				(reservation: Reservation) => {
					const reservationDate = new Date(reservation.date);
					const hours = Number(reservation.start_time.slice(0, 2));
					reservationDate.setHours(hours);
					console.log(reservation);
					return {
						id: reservation.id,
						date: reservationDate,
						start_time: reservation.start_time,
						end_time: reservation.end_time,
						players: reservation.amount_of_players,
						additional_info: reservation.additional_info,
						name: reservation.name,
						username: reservation.username,
					};
				}
			);

			const today = new Date(Date.now());
			let pastReservationsList = reservations.filter(
				(reservation: Reservation) => reservation.date < today
			);
			let upcomingReservationsList = reservations.filter(
				(reservation: Reservation) => reservation.date > today
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

	const handleDeleteReservation = (reservation: Reservation) => {
		const id: string = reservation.id;
		setUpcomingreservations((prevReservations) =>
			prevReservations.filter(
				(targetReservation) => targetReservation.id !== id
			)
		);
		deleteReservation(id).then((response) => {
			if (response.status === 200) {
				getReservations();
			} else {
				// If the delete request fails, revert the state update
				getReservations();
			}
		});
	};

	const upcomingReservationRows = upcomingReservations.map((reservation) => {
		return (
			<ReservationRow
				key={reservation.id}
				reservation={reservation}
				delete={handleDeleteReservation}
			/>
		);
	});

	const pastReservationRows = pastReservations.map((reservation) => {
		return (
			<ReservationRow
				key={reservation.id}
				reservation={reservation}
				delete={handleDeleteReservation}
			/>
		);
	});

	useEffect(() => {
		getLaneInfo();
		getUserInfo();
		getReservations();
	}, []);

	return userInfo.state.loggedIn && userInfo.state.admin ? (
		<Tabs
			defaultActiveKey="lanes"
			id="admintabs"
			className="adminTabs mb-3 justify-content-center"
		>
			<Tab eventKey="lanes" title="Lanes">
				<div className="adminPageContainer">
					<h3>Radat</h3>
					<AddLaneComponent add={handleAddLane} />
					{laneRows}
				</div>
			</Tab>
			<Tab eventKey="users" title="Users">
				<div className={!isTabletOrMobile ? "adminPageContainer" : ""}>
					<h3>Käyttäjät</h3>
					<Table striped bordered responsive>
						<UsersTableHead />
						<tbody>{usersTable}</tbody>
					</Table>
				</div>
			</Tab>
			<Tab eventKey="reservations" title="Reservations">
				<div className={!isTabletOrMobile ? "adminPageContainer" : ""}>
					<h3>Tulevat varaukset</h3>
					<Table striped bordered responsive>
						<ReservationsTableHead />
						<tbody>{upcomingReservationRows}</tbody>
					</Table>
					<h3>Menneet varaukset</h3>
					<Table striped bordered responsive>
						<ReservationsTableHead />
						<tbody>{pastReservationRows}</tbody>
					</Table>
				</div>
			</Tab>
		</Tabs>
	) : (
		<div>Unauthorized</div>
	);
};

export default AdminPage;

const AddLaneComponent = (props: { add: (name: string) => void }) => {
	const [laneName, setLaneName] = useState("");

	return (
		<div className="laneRow mb-3">
			<Form.Group className="me-3">
				<Form.Label>Radan nimi</Form.Label>
				<Form.Control
					required
					value={laneName}
					onChange={(e) => {
						setLaneName(e.target.value);
					}}
					type="text"
					className="me-3"
				/>
			</Form.Group>
			<Button
				onClick={() => props.add(laneName)}
				className="laneButton"
				variant="dark"
			>
				Lisää rata
			</Button>
		</div>
	);
};

const LaneRow = (props: {
	lane: Lane;
	edit: (lane: Lane, name: string, usable: boolean) => void;
}) => {
	const [name, setName] = useState(props.lane.name);
	const [usable, setUsable] = useState(props.lane.usable);

	return (
		<div className="laneRow mb-3">
			<Form.Group className="me-3">
				<Form.Label>Radan nimi</Form.Label>
				<Form.Control
					required
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					type="text"
					className="me-3"
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Rata käytettävissä?</Form.Label>
				<Form.Check
					type="checkbox"
					checked={usable}
					onClick={() => setUsable(!usable)}
					className="me-3"
				/>
			</Form.Group>

			<Button
				className="laneButton"
				variant="dark"
				onClick={() => props.edit(props.lane, name, usable)}
			>
				Muokkaa
			</Button>
		</div>
	);
};

const UsersTableHead = () => {
	return (
		<thead>
			<tr>
				<th>id</th>
				<th>username</th>
				<th>email</th>
				<th>phone number</th>
				<th>address</th>
				<th>admin?</th>
				<th>actions</th>
			</tr>
		</thead>
	);
};

const UsersRow = (props: {
	user: User;
	edit: (user: User) => void;
	delete: (user: User) => void;
}) => {
	const [admin, setAdmin] = useState(props.user.admin);
	const toggleAdmin = () => {
		const updatedUser = { ...props.user, admin: !admin };
		props.edit(updatedUser);
		setAdmin(!admin);
	};
	const deleteUser = () => {
		props.delete(props.user);
	};

	return (
		<tr>
			<td>{props.user.id}</td>
			<td>{props.user.username}</td>
			<td>{props.user.email}</td>
			<td>{props.user.phone_number}</td>
			<td>{props.user.address}</td>
			<td>{admin ? "admin" : ""}</td>
			<td className="tableButtons">
				<Button
					className="tableButton"
					variant="dark"
					onClick={toggleAdmin}
				>
					{admin ? "Undo admin" : "Make admin"}
				</Button>
				<Button
					className="tableButton"
					variant="dark"
					onClick={deleteUser}
				>
					Delete
				</Button>
			</td>
		</tr>
	);
};

const ReservationsTableHead = () => {
	return (
		<thead>
			<tr>
				<th>id</th>
				<th>Username</th>
				<th>Lane</th>
				<th>Date</th>
				<th>Start time</th>
				<th>End time</th>
				<th>Actions</th>
			</tr>
		</thead>
	);
};

const ReservationRow = (props: {
	reservation: Reservation;
	delete: (reservation: Reservation) => void;
}) => {
	const deleteReservation = () => {
		props.delete(props.reservation);
	};

	return (
		<tr>
			<td>{props.reservation.id}</td>
			<td>{props.reservation.username}</td>
			<td>{props.reservation.name}</td>
			<td>{props.reservation.date.toString()}</td>
			<td>{props.reservation.start_time}</td>
			<td>{props.reservation.end_time}</td>
			<td className="tableButtons">
				<Button
					className="tableButton"
					variant="dark"
					onClick={deleteReservation}
				>
					Delete
				</Button>
			</td>
		</tr>
	);
};
