import { useState, useEffect, useContext } from "react";
import "./styles/calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LaneTimeTable } from "./LaneTimeTable";
import { Button } from "react-bootstrap";
import { getLanes, getReservationInfoByDate } from "./BackendService.ts";
import { Link } from "react-router-dom";
import { AppContext } from "./App.tsx";

export class timeButton {
	reserved: boolean;
	clicked: boolean;
	startTime: number;
	endTime: number;
	laneName: number;
	laneId: string;
	constructor(
		reserved: boolean,
		startTime: number,
		endTime: number,
		laneName: number,
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
	laneName: number;
	startTime: number;
	endTime: number;
	laneId: string;
}

const ReservationCalendarPage = () => {
	const [lanesCount, setLanesCount] = useState(10);
	const [buttonsToDisable, setButtonsToDisable] = useState<
		Array<Array<Array<number>>>
	>([]);
	const [startDate, setStartDate] = useState(new Date());
	const [selectedTimes, setSelectedTimes] = useState<Array<selectedTime>>();
	const [timeButtons, setTimeButtons] = useState<Array<timeButton>>();
	const openingTimes = { open: 12, close: 24 };

	const userInfo = useContext(AppContext);

	const hook = async () => {
		const response = await getLanes();
		console.log(response.data);
		generateLanes(response.data);
		console.log(startDate);
		const dateString = `${startDate.getFullYear()}-${
			startDate.getMonth() + 1
		}-${startDate.getDate()}`;
		const reservations = await getReservationInfoByDate(dateString);

		if (reservations.data.length > 0) {
			const reservedTimes = reservations.data.map((element) => {
				return generateHourlyArray([
					Number(element.name),
					Number(element.start_time.slice(0, 2)),
					Number(element.end_time.slice(0, 2)),
				]);
			});
			setButtonsToDisable(reservedTimes);
		}
	};
	useEffect(() => {
		hook();
	}, [startDate]);

	useEffect(() => {
		disableButtons();
	}, [buttonsToDisable]);

	const generateLanes = (data: Array<any>) => {
		setLanesCount(data.length);
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
						Number(element.name),
						element.id
					)
				);
			}
		});

		setTimeButtons(timesArray);
		generateSelectedTimes(data);
	};

	const generateSelectedTimes = (data: Array<any>) => {
		const newSelectionArray = data.map((element) => {
			return {
				laneName: Number(element.name),
				startTime: 0,
				endTime: 0,
				laneId: element.id,
			};
		});
		setSelectedTimes(newSelectionArray);
		console.log(newSelectionArray);
	};

	const generateHourlyArray = (data: Array<number>) => {
		const hourlyArray = [];

		for (let time = data[1]; time <= data[2]; time++) {
			hourlyArray.push([data[0], time]);
		}
		return hourlyArray;
	};

	const disableButtons = () => {
		if (timeButtons !== undefined) {
			const newButtons = [...timeButtons];
			newButtons.map((element) => {
				for (let index = 0; index < buttonsToDisable.length; index++) {
					for (let i = 0; i < buttonsToDisable[index].length; i++) {
						if (
							element.laneName ===
								buttonsToDisable[index][i][0] &&
							element.startTime === buttonsToDisable[index][i][1]
						) {
							element.reserved = true;
						}
					}
				}
				return element;
			});
			setTimeButtons(newButtons);
		}
	};

	const handleClick = (
		laneName: number,
		startTime: number,
		endTime: number
	) => {
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
		}
	};

	const renderLanes = () => {
		const lanes = [];
		if (timeButtons !== undefined) {
			for (let index = 0; index < lanesCount; index++) {
				const laneArray = timeButtons.filter(
					(element) => element.laneName === index + 1
				);
				lanes.push(
					<LaneTimeTable
						key={index + 1}
						laneName={index + 1}
						laneArray={laneArray}
						handleClick={handleClick}
					/>
				);
			}
		}

		return lanes;
	};

	const renderTimes = () => {
		const timeText = selectedTimes?.map((element) => {
			if (element.startTime !== undefined && element.startTime !== 0) {
				return (
					<p key={element.laneName}>
						Lane number:{element.laneName} {element.startTime}:00 -{" "}
						{element.endTime}:00 {element.laneId}
					</p>
				);
			}
		});
		return timeText;
	};

	return userInfo.state.loggedIn ? (
		<div className="container">
			<div className="reservationDiv">
				<h1 className="mt-3">Ajanarauskalenteri</h1>
				<p className="mb-3">Valitse aika</p>
				<div id="datePicker">
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
					/>
				</div>
			</div>
			<div className="tracks mb-4">{renderLanes()}</div>
			<div className="reservationDiv mb-5">
				{renderTimes()}
				<Link to="/confirm">
					<Button variant="dark">Valitse ajat</Button>
				</Link>
			</div>
		</div>
	) : (
		"You need to be logged in to view this page"
	);
};

export default ReservationCalendarPage;
