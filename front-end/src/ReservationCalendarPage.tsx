import { useState } from "react";
import "./styles/calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LaneTimeTable } from "./LaneTimeTable";
import { Button } from "react-bootstrap";


class timeButton {
	reserved: boolean;
	clicked: boolean;
	startTime: number;
	endTime: number;
	laneId: number;
	constructor (reserved:boolean, startTime:number, endTime:number, lanekId:number){
		this.reserved = reserved;
		this.startTime = startTime;
		this.endTime = endTime;
		this.clicked = false;
		this.laneId = lanekId;
	} 
}

const ReservationCalendarPage = () => {
	const lanesCount = 4;

	const disableButtons = (newButtons:timeButton[]) => {
		const buttonsToDisable = [[1,12],[1,13],[3,14],[4,20]];
		newButtons.map(element => {
			for (let index = 0; index < buttonsToDisable.length; index++) {
				if(element.laneId === buttonsToDisable[index][0] && element.startTime === buttonsToDisable[index][1]){
					element.reserved = true;
				}
			}
			return element;
		});
		return newButtons;
	};

	const generateArray = () => {
		const timesArray = [];
		let laneId = 1;
		for(let i = 0; i < lanesCount; i++){
			for (let index = 12; index < 24; index++) {
				timesArray.push(new timeButton(false, index, index+1, laneId));
			}
			laneId++;
		}
		return disableButtons(timesArray);	
	};

	const generateSelectedTimes = () => {
		const newSelectionArray = [];
		for(let i = 0; i < lanesCount; i++){
			newSelectionArray.push({laneId:(i+1), startTime:0, endTime:0});
		}
		return newSelectionArray;
	};

	const [timeButtons, setTimeButtons] = useState<Array<timeButton>>(generateArray());
	const [startDate, setStartDate] = useState(new Date());
	const [selectedTimes, setSelectedTimes] = useState(generateSelectedTimes());
	
	const handleClick = (laneName:number, startTime: number, endTime: number) => {
		
		const filterSelectedTimes = selectedTimes.filter(element => element.laneId === laneName).sort((a, b) => a.startTime - b.startTime);

		if(filterSelectedTimes[0].startTime === 0 || 
			filterSelectedTimes[0].startTime === (startTime + 1) || 
			filterSelectedTimes[filterSelectedTimes.length - 1].endTime === (endTime - 1) ||
			filterSelectedTimes[0].startTime === startTime ||
			filterSelectedTimes[filterSelectedTimes.length - 1].endTime === endTime) {

			const newButtons = [...timeButtons];
			newButtons.map(element => {
				if (element.laneId === laneName && element.startTime === startTime) {
					element.clicked ? element.clicked = false : element.clicked = true;
				}
				return element;
			});
			setTimeButtons(newButtons);

			const filteredTrack = newButtons.filter(element => element.laneId === laneName && element.clicked);
			const newTimes = [...selectedTimes];
			newTimes.map(element => {
				if(element.laneId === laneName) {
					if(filteredTrack.length === 0) {
						element.startTime = 0;
						element.endTime = 0;
					} else {
						const sorted = filteredTrack.sort((a, b) => a.startTime - b.startTime);
						element.startTime = sorted[0].startTime;
						element.endTime = sorted[sorted.length-1].endTime;
					}
				}
			});
			setSelectedTimes(newTimes);
		}
	};

	const renderLanes = () => {
		const lanes = [];
		for (let index = 0; index < lanesCount; index++) {
			const laneArray = timeButtons.filter(element => element.laneId === index + 1);
			lanes.push(<LaneTimeTable key={index+1} laneName={(index + 1)} laneArray={laneArray} handleClick={handleClick}/>);	
		}
		return lanes;
	};

	return (
		<div className="container">
			<div className="reservationDiv">
				<h1 className="mt-3">Ajanarauskalenteri</h1>
				<p className="mb-3">Valitse aika</p>
				<div id="datePicker">
					<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
				</div>
			</div>
			<div className="tracks mb-4">
				{renderLanes()}
			</div>
			<div className="reservationDiv mb-5">
				<p>{selectedTimes[0].startTime}:00 - {selectedTimes[0].endTime}:00</p>
				<p>{selectedTimes[1].startTime}:00 - {selectedTimes[1].endTime}:00</p>
				<p>{selectedTimes[2].startTime}:00 - {selectedTimes[2].endTime}:00</p>
				<p>{selectedTimes[3].startTime}:00 - {selectedTimes[3].endTime}:00</p>
				<Button variant="dark">Valitse ajat</Button>
			</div>
		</div>
	);
};

export default ReservationCalendarPage;
