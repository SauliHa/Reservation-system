import { useEffect, useState } from "react";
import { editLane, getLanes } from "./BackendService";
import "./styles/adminpage.css";
import { Button, Form } from "react-bootstrap";

interface Lane {
	id: string;
	name: string;
	usable: boolean;
}

const AdminPage = () => {
	const [lanes, setLanes] = useState<Lane[]>([]);

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

	useEffect(() => {
		getLaneInfo();
	}, []);

	const laneRows = lanes.map((lane) => {
		return <LaneRow key={lane.id} lane={lane} edit={handleLaneEdit} />;
	});

	return (
		<div className="adminPageContainer">
			<h3>Radat</h3>
			{laneRows}
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
