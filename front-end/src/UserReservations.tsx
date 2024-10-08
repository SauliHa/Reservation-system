import { useContext, useEffect, useState } from "react";
import { deleteReservation, getUserReservations } from "./BackendService";
import { AppContext } from "./App";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import ReservationRow from "./ReservationRow";

import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export interface Reservation {
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
	const isTabletOrMobile = useMediaQuery({ maxWidth: 900 });
	const { t } = useTranslation();
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
			<ReservationRow
				key={reservation.id}
				reservation={reservation}
				handleCancelClick={handleCancelClick}
				updateReservations={updateReservations}
			/>
		);
	});

	const pastReservationRows = pastReservations.map((reservation) => {
		return (
			<ReservationRow
				key={reservation.id}
				reservation={reservation}
				updateReservations={updateReservations}
			/>
		);
	});

	const sizeCheck = () => {
		if(isTabletOrMobile){
			return (
				<div>
					<h3>{t("user-reservations.upcoming-reservations")}</h3>
					<MDBTable responsive>
						<TableHeader />
						<MDBTableBody>{upcomingReservationRows}</MDBTableBody>
					</MDBTable>
					<h3>{t("user-reservations.past-reservations")}</h3>
					<MDBTable responsive>
						<TableHeader />
						<MDBTableBody>{pastReservationRows}</MDBTableBody>
					</MDBTable>
				</div>
			);
		} else {
			return	(
				<div className="userPageContainer">
					<h3>{t("user-reservations.upcoming-reservations")}</h3>
					<MDBTable responsive>
						<TableHeader />
						<MDBTableBody>{upcomingReservationRows}</MDBTableBody>
					</MDBTable>
					<h3>{t("user-reservations.past-reservations")}</h3>
					<MDBTable responsive>
						<TableHeader />
						<MDBTableBody>{pastReservationRows}</MDBTableBody>
					</MDBTable>
				</div>
			);
		}
	};

	return (
		<>
			{sizeCheck()}
		</>
	);
};

const TableHeader = () => {
	const { t } = useTranslation();
	return (
		<MDBTableHead>
			<tr>
				<th>{t("user-reservations.date")}</th>
				<th>{t("user-reservations.start-time")}</th>
				<th>{t("user-reservations.end-time")}</th>
				<th>{t("user-reservations.players")}</th>
				<th>{t("user-reservations.additional-info")}</th>
				<th>{t("user-reservations.lane-name")}</th>
			</tr>
		</MDBTableHead>
	);
};

export default UserReservations;
