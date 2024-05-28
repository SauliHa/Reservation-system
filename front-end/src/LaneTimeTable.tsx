import { timeButton } from "./ReservationCalendarPage";

export const LaneTimeTable = ( {laneName: laneName, laneArray: laneArray, handleClick}:PropsValidation) => {
	
	const handleButtonClick = (startTime: number) => {
		handleClick(laneName, startTime, (startTime+1));
	};
	const boxes = laneArray.map(element =>{
		if (element.ownReservation) {
			return <button key={(element.startTime)} 
				id={element.startTime.toString()} 
				className="ownReservation"
				disabled>
				{element.startTime} - {element.endTime}
			</button>;
		} else if (element.reserved) {
			return <button key={(element.startTime)} 
				id={element.startTime.toString()} 
				className="box" disabled>
				{element.startTime} - {element.endTime}
			</button>;
		} else{

			return <button key={(element.startTime)} 
				id={element.startTime.toString()} 
				className={element.clicked ? "box boxClicked" : "box"} 
				onClick={() => handleButtonClick(element.startTime)}>
				{element.startTime} - {element.endTime}
			</button>;
		}
	});
	
	return ( 
		<div className="grid-container">
			<div className="boxTitle">{"Lane " + laneName}</div>
			{boxes}
		</div>
	);

};

interface PropsValidation {
	laneName: string;
	laneArray:timeButton[];
	handleClick: (laneId:string, startTime:number, endTime:number) => void;
}