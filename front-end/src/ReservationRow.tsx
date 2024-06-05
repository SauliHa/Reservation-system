import { Button, Form } from "react-bootstrap";
import { Reservation } from "./UserReservations";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { updateReservation } from "./BackendService";

const ReservationRow = (props: {
	handleCancelClick?: (id: string) => void;
	reservation: Reservation;
	updateReservations: () => void;
}) => {
	const { t } = useTranslation();

	const [editMode, setEditMode] = useState(false);
	const [playerCount, setPlayerCount] = useState(props.reservation.players);
	const [additionalInfo, setAdditionalInfo] = useState(
		props.reservation.additionalInfo
	);

	const handleCancelClick = () => {
		if (props.handleCancelClick) {
			props.handleCancelClick(props.reservation.id);
		}
	};

	const handleEditClick = () => {
		if (editMode) {
			updateReservation(
				props.reservation.id,
				playerCount,
				additionalInfo
			).then((response) => {
				if (response === 200) {
					props.updateReservations();
				}
			});
		}
		setEditMode(!editMode);
	};

	return (
		<tr key={props.reservation.id}>
			<td>
				{props.reservation.date.getDate()}.
				{props.reservation.date.getMonth() + 1}.
				{props.reservation.date.getFullYear()}
			</td>
			<td>{props.reservation.startTime}</td>
			<td>{props.reservation.endTime}</td>
			<td>
				{!editMode ? (
					props.reservation.players
				) : (
					<Form.Group className="mb-3">
						<Form.Control
							required
							value={playerCount}
							onChange={(e) => {
								setPlayerCount(Number(e.target.value));
							}}
							type="number"
						/>
					</Form.Group>
				)}
			</td>
			<td>
				{!editMode ? (
					props.reservation.additionalInfo
				) : (
					<Form.Group className="mb-3">
						<Form.Control
							required
							value={additionalInfo}
							onChange={(e) => {
								setAdditionalInfo(e.target.value);
							}}
							type="text"
						/>
					</Form.Group>
				)}
			</td>
			<td>{props.reservation.laneName}</td>
			{props.handleCancelClick ? (
				<>
					<td>
						<Button
							onClick={() => handleCancelClick()}
							variant="danger"
						>
							{t("user-reservations.cancel-reservation")}
						</Button>
					</td>
					<td>
						<Button variant="dark" onClick={handleEditClick}>
							{!editMode
								? t("user-reservations.edit-reservation")
								: t("user-reservations.save-reservation")}
						</Button>
					</td>
				</>
			) : (
				""
			)}
		</tr>
	);
};

export default ReservationRow;
