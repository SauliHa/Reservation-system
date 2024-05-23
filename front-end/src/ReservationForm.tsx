import { Button, Form } from "react-bootstrap";

const ReservationForm = () => {

	return (
		<div className="reservationForm">
			<Form.Group className="mb-3">
				<Form.Label>Pelaajien määrä</Form.Label>
				<Form.Control as="textarea" rows={1} />
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Lisätietoja</Form.Label>
				<Form.Control as="textarea" rows={3} />
			</Form.Group>
			<Button>Lähetä</Button>
		</div>

	);
};

export default ReservationForm;