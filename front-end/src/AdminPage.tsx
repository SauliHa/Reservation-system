import { useEffect, useState } from "react";
import { editLane, getLanes, getAllUsers, sendEditUserRequest } from "./BackendService"; 
import "./styles/adminpage.css";
import { Button, Form, Table } from "react-bootstrap";
import { User } from "./LoginPage"; 

interface Lane {
	id: string;
	name: string;
	usable: boolean;
}

const AdminPage = () => {
	const [lanes, setLanes] = useState<Lane[]>([]);
	const [users, setUsers] = useState<User[]>([]);

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

	const laneRows = lanes.map((lane) => {
		return <LaneRow key={lane.id} lane={lane} edit={handleLaneEdit} />;
	});
	
	const getUserInfo = () => {
		getAllUsers().then((response) => {
			console.log("Fetched users:", response.data); 
			setUsers(response.data);
		});
	};

	const handleUserEdit = (user: User) => {
		const editedUser = {id: user.id, admin: user.admin};
		sendEditUserRequest(editedUser).then((response) => {
			if (response.status === 200) {
				getUserInfo();
			}
		});
	};

	useEffect(() => {
		getLaneInfo();
		getUserInfo();
	}, []);

	const usersTable = users.map((user) => {
		return <UsersRow key={user.id} user={user} edit={handleUserEdit}  />; 
	});

	return (
		<div className="adminPageContainer">
			<div>
				<h3>Radat</h3>
				{laneRows}
			</div>
			<div>
				<h3>Käyttäjät</h3>
				{usersTable}
			</div>
		</div>
	);
};

export default AdminPage;

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
				variant="dark"
				onClick={() => props.edit(props.lane, name, usable)}
			>
				Muokkaa
			</Button>
		</div>
	);
};

const UsersRow = ( props: {
	user: User,
	edit: (user: User) => void;
}) => {
	const [admin, setAdmin] = useState(props.user.admin);
	const toggleAdmin = () => {
		const updatedUser = { ...props.user, admin: !admin };
		props.edit(updatedUser);
		setAdmin(!admin);
	};

	return (
		<div className="usersRow mb-3">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>id</th>
						<th>username</th>
						<th>email</th>
						<th>phone number</th>
						<th>address</th>
						<th>admin?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{props.user.id}</td>
						<td>{props.user.username}</td>
						<td>{props.user.email}</td>
						<td>{props.user.phone_number}</td>
						<td>{props.user.address}</td>
						<td>{admin ? "admin" : ""}</td>
						<td>
							<Button
								variant="dark"
								onClick={toggleAdmin}>
				Toggle admin
							</Button>
						</td>
					</tr>
				
				</tbody>
			</Table>
		</div>
	);
};

