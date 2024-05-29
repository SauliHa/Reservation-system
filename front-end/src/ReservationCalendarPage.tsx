import { useState, useEffect, useContext } from "react";
import "./styles/calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LaneTimeTable } from "./LaneTimeTable";
import { Button } from "react-bootstrap";
import { getLanes, getReservationInfoByDate } from "./BackendService.ts";
import { Link } from "react-router-dom";
import { AppContext } from "./App.tsx";
import { useTranslation } from "react-i18next";

export class timeButton {
	reserved: boolean;
	clicked: boolean;
	startTime: number;
	endTime: number;
	laneName: string;
	laneId: string;
	ownReservation?: boolean;
	constructor(
		reserved: boolean,
		startTime: number,
		endTime: number,
		laneName: string,
		laneId: string
	) {
		this.reserved = reserved;
		this.startTime = startTime;
		this.endTime = endTime;
		this.clicked = false;
		this.laneName = laneName;
		this.laneId = laneId;
	}
}

interface selectedTime {
	laneName: string;
	startTime: number;
	endTime: number;
	laneId: string;
}

interface disableButton {
	name: string;
	start: number;
	end: number;
	own: boolean;
}

interface lane {
	id: string;
	name: string;
	usable: boolean;
}

interface reservation {
	end_time: string;
	id: string;
	name: string;
	start_time: string;
	user_id: string;
}

const ReservationCalendarPage = () => {
	const {t} = useTranslation();
	const [buttonsToDisable, setButtonsToDisable] = useState<
		Array<Array<disableButton>>
	>([]);
	const [startDate, setStartDate] = useState(new Date());
	const [selectedTimes, setSelectedTimes] = useState<Array<selectedTime>>();
	const [timeButtons, setTimeButtons] = useState<Array<timeButton>>();
	const openingTimes = { open: 12, close: 24 };

	const userInfo = useContext(AppContext);

	const hook = async () => {
		const response = await getLanes();
		const laneData: Array<lane> = response.data;
		const filterUnusableLanes = laneData.filter(element => element.usable);
		generateLanes(filterUnusableLanes);
		getReservations();
	};
	useEffect(() => {
		hook();
	}, [startDate, userInfo.state.id]);

	useEffect(() => {
		disableButtons();
	}, [buttonsToDisable]);
	
	const getReservations = async () => {
		const dateString = `${startDate.getFullYear()}-
		${startDate.getMonth()+1}-
		${startDate.getDate()}`;
		const response = await getReservationInfoByDate(dateString);
		const reservations: Array<reservation> = response.data;
		if (reservations.length > 0) {
			const reservedTimes = reservations.map((element) => {
				const ownReservation = element.user_id === userInfo.state.id ? true : false;
				return generateHourlyArray({
					name: element.name,
					start: Number(element.start_time.slice(0, 2)),
					end: Number(element.end_time.slice(0, 2)),
					own: ownReservation,
				});
			});
			setButtonsToDisable(reservedTimes);
		}
	};

	const generateLanes = (data: Array<lane>) => {
		const timesArray: Array<timeButton> = [];
		data.map((element) => {
			for (
				let index = openingTimes.open;
				index < openingTimes.close;
				index++
			) {
				timesArray.push(
					new timeButton(
						false,
						index,
						index + 1,
						element.name,
						element.id
					)
				);
			}
		});

		setTimeButtons(timesArray);
		generateSelectedTimes(data);
	};

	const generateSelectedTimes = (data: Array<lane>) => {
		const newSelectionArray = data.map((element) => {
			return {
				laneName: element.name,
				startTime: 0,
				endTime: 0,
				laneId: element.id,
			};
		});
		setSelectedTimes(newSelectionArray);
	};

	const generateHourlyArray = (data: disableButton) => {
		const hourlyArray = [];

		for (let time = data.start; time <= data.end; time++) {
			hourlyArray.push({name:data.name, start:time, end:time+1, own:data.own});
		}
		return hourlyArray;
	};

	const disableButtons = () => {
		if (timeButtons !== undefined) {
			const newButtons = [...timeButtons];
			newButtons.map((element) => {
				for (let index = 0; index < buttonsToDisable.length; index++) {
					for (let i = 0; i < buttonsToDisable[index].length-1; i++) {
						if (
							element.laneName ===
								buttonsToDisable[index][i].name &&
							element.startTime === buttonsToDisable[index][i].start
							
						) {
							element.reserved = true;
							if(buttonsToDisable[index][i].own) {
								element.ownReservation = true;	
							}
						}
					}
				}
				return element;
			});
			setTimeButtons(newButtons);
		}
	};

	const handleClick = (
		laneName: string,
		startTime: number,
		endTime: number
	) => {
		if(selectedTimes !== undefined && timeButtons !== undefined){
			const filterSelectedTimes = selectedTimes
				.filter((element) => element.laneName === laneName)
				.sort((a, b) => a.startTime - b.startTime);
			if (
				filterSelectedTimes[0].startTime === 0 ||
			filterSelectedTimes[0].startTime === startTime + 1 ||
			filterSelectedTimes[filterSelectedTimes.length - 1].endTime ===
				endTime - 1 ||
			filterSelectedTimes[0].startTime === startTime ||
			filterSelectedTimes[filterSelectedTimes.length - 1].endTime ===
				endTime
			) {
				const newButtons = [...timeButtons];
				newButtons.map((element) => {
					if (
						element.laneName === laneName &&
					element.startTime === startTime
					) {
						element.clicked
							? (element.clicked = false)
							: (element.clicked = true);
					}
					return element;
				});
				setTimeButtons(newButtons);

				const filteredLane = newButtons.filter(
					(element) => element.laneName === laneName && element.clicked
				);
				const newTimes = [...selectedTimes];
				newTimes.map((element) => {
					if (element.laneName === laneName) {
						if (filteredLane.length === 0) {
							element.startTime = 0;
							element.endTime = 0;
						} else {
							const sorted = filteredLane.sort(
								(a, b) => a.startTime - b.startTime
							);
							element.startTime = sorted[0].startTime;
							element.endTime = sorted[sorted.length - 1].endTime;
						}
					}
				});
				setSelectedTimes(newTimes);
			} else {
				window.alert("You can only select a time next to the current one");
			}
		}
	};

	const isButtonReady = () => {
		if(selectedTimes !== undefined){
			const sum = selectedTimes.reduce( (acc, cur) => acc + cur.startTime, 0);
			if(sum > 0){
				return true;
			}
		}
		return false;
	};

	const renderLanes = () => {
		if (timeButtons !== undefined && selectedTimes !== undefined) {
			const lanes = selectedTimes.map(lane => {
				const laneArray = timeButtons.filter( (element) => {
					return element.laneId=== lane.laneId;
				}
				);
				const timeTableElement = 
				<LaneTimeTable
					key={lane.laneId}
					laneName={lane.laneName}
					laneArray={laneArray}
					handleClick={handleClick}
				/>;
				return timeTableElement;
			});
			return lanes;
		}

	};

	return userInfo.state.loggedIn ? (
		<div className="container">
			<div className="reservationDiv">
				<h1 className="mt-3">{t("reservation-calendar-page.reservation-calendar")}</h1>
				<p>{t("reservation-calendar-page.subtitle-instruction")}</p>
				<h4 className="mb-3 mt-3">{t("reservation-calendar-page.pick-time")}</h4>
				<div id="datePicker">
					<DatePicker
						selected={startDate}
						onChange={(date) => date === null ? null : setStartDate(date)}
					/>
				</div>
			</div>
			<div className="tracks mb-4">{renderLanes()}</div>
			<div className="reservationDiv mb-5">
				{isButtonReady() ?
					<Link to="/confirm" state={{selectedTimes:selectedTimes, pickedDate:startDate}}><Button variant="dark">{t("reservation-calendar-page.pick-times")}</Button></Link>:
					<Button variant="dark" disabled>{t("reservation-calendar-page.pick-times")}</Button>
				}
			</div>
			<div className="reservationDiv mb-5">
				<h4>{t("reservation-calendar-page.instruction")}</h4>
				<div id="guide">
					<button className="box mb-2">14 - 15</button> 
					<p>{t("reservation-calendar-page.available-time")}</p>
					<button className="box boxClicked mb-2">14 - 15</button> 
					<p>{t("reservation-calendar-page.chosen-time")}</p>
					<button className="box mb-2" disabled>14 - 15</button>	
					<p>{t("reservation-calendar-page.other-reservations")}</p> 
					<button className="ownReservation mb-2" disabled>14 - 15</button>	
					<p>{t("reservation-calendar-page.own-reservations")}</p> 
				</div>
			</div>
		</div>
	) : (
		t("reservation-calendar-page.need-to-log")
	);
};

export default ReservationCalendarPage;
