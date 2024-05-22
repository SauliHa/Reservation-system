class timeButton {
	reserved: boolean;
	clicked: boolean;
	startTime: number;
	endTime: number;
	laneId: number;
	constructor (reserved:boolean, startTime:number, endTime:number, laneId:number){
		this.reserved = reserved;
		this.startTime = startTime;
		this.endTime = endTime;
		this.clicked = false;
		this.laneId = laneId;
	} 
}

export const LaneTimeTable = ( {laneName: laneName, laneArray: laneArray, handleClick}:PropsValidation) => {
	
	const handleButtonClick = (startTime: number) => {
		handleClick(laneName, startTime, (startTime+1));
	};

	const boxes = laneArray.map(element =>{
		if (element.reserved) {
			return <button key={(element.startTime)} 
				id={element.startTime.toString()} 
				className="box" disabled>
				{element.startTime} - {element.endTime}
			</button>;
		} else {

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
	laneName: number;
	laneArray:timeButton[];
	handleClick: (laneId:number, startTime:number, endTime:number) => void;
}