import { Button } from "react-bootstrap";
import { User } from "./LoginPage";

const UserDetailsComponent = (props: {
	userData: User;
	changeEditMode: (mode: boolean) => void;
}) => {
	return (
		<div className="userPageContainer">
			<div className="userDetails">
				<h3>User details:</h3>
				<p>
					<b>Username:</b> {props.userData.username}
				</p>
				<p>
					<b>Email:</b> {props.userData.email}
				</p>
				<p>
					<b>Phone number:</b> {props.userData.phonenumber}
				</p>
				<p>
					<b>Address:</b> {props.userData.address}
				</p>
			</div>
			<div>
				<Button
					variant="primary"
					onClick={() => props.changeEditMode(true)}
					className="mb-3"
				>
					Change user info
				</Button>
				<br />
				<Button variant="danger" className="mb-3">
					Delete account
				</Button>
			</div>
		</div>
	);
};

export default UserDetailsComponent;
