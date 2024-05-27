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
	laneName: string;
	laneId: string;
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

const ReservationCalendarPage = () => {
	const [buttonsToDisable, setButtonsToDisable] = useState<
		Array<Array<Array<string | number>>>
	>([]);
	const [startDate, setStartDate] = useState(new Date());
	const [selectedTimes, setSelectedTimes] = useState<Array<selectedTime>>();
	const [timeButtons, setTimeButtons] = useState<Array<timeButton>>();
	const openingTimes = { open: 12, close: 24 };

	const userInfo = useContext(AppContext);

	const hook = async () => {
		const response = await getLanes();
		console.log(response.data);
		const filterUnusableLanes = response.data.filter(element => element.usable);
		generateLanes(filterUnusableLanes);
		const dateString = `${startDate.getFullYear()}-
		${startDate.getMonth()+1}-
		${startDate.getDate()}`;
		const reservations = await getReservationInfoByDate(dateString);

		if (reservations.data.length > 0) {
			const reservedTimes = reservations.data.map((element) => {
				return generateHourlyArray([
					element.name,
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const generateLanes = (data: Array<any>) => {
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

	const generateSelectedTimes = (data: Array<any>) => {
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

	const generateHourlyArray = (data: Array<string | number>) => {
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
					for (let i = 0; i < buttonsToDisable[index].length-1; i++) {
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
		laneName: string,
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
				<h1 className="mt-3">Ajanarauskalenteri</h1>
				<p>Voit valita aikoja usealta radalta mutta yhdellä radalla ajanvarus pitää olla yhtäjaksoisesti.</p>
				<p>Ohje</p>
				<button className="box mb-2">14 - 15</button> 
				<p>Vapaa aika</p>
				<button className="box boxClicked mb-2">14 - 15</button> 
				<p>Valitsemasi aika</p>
				<button className="box mb-2" disabled>14 - 15</button>	
				<p className="mb-4">Varattu aika</p> 
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
				{isButtonReady() ?
					<Link to="/confirm" state={{selectedTimes:selectedTimes, pickedDate:startDate}}><Button variant="dark">Valitse ajat</Button></Link>:
					<Button variant="dark" disabled>Valitse ajat</Button>
				}
			</div>
		</div>
	) : (
		"You need to be logged in to view this page"
	);
};

export default ReservationCalendarPage;
