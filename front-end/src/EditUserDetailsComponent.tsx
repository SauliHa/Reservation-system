import { Button, Form } from "react-bootstrap";
import { User } from "./LoginPage";
import { useState } from "react";
import { sendEditUserRequest } from "./BackendService";

const EditUserDetailsComponent = (props: {
	userData: User;
	changeEditMode: (mode: boolean) => void;
}) => {
	const [username, setUsername] = useState(props.userData.username);
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [email, setEmail] = useState(props.userData.email);
	const [phone, setPhone] = useState(props.userData.phone_number);
	const [address, setAddress] = useState(props.userData.address);
	const [validated, setValidated] = useState(false);
	const [showPasswordMatchingError, setShowPasswordMatchingError] =
		useState(false);
	const [showDuplicateEmailError, setShowDuplicateEmailError] =
		useState(false);

	const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			setValidated(false);
		} else {
			if (password === passwordRepeat) {
				editUser();
			} else {
				setShowPasswordMatchingError(true);
			}
		}
		setValidated(true);
	};

	const editUser = () => {
		const editedUser: User = {
			id: props.userData.id,
			username: username,
			phone_number: phone,
		};
		if (password.length > 0) {
			editedUser.password = password;
		}
		if (email !== props.userData.email) {
			editedUser.email = email;
		}
		if (address !== undefined && address.length > 0) {
			editedUser.address = address;
		}

		sendEditUserRequest(editedUser).then((response) => {
			if (response === 401) {
				setShowDuplicateEmailError(true);
			}
			if (response === 200) {
				props.changeEditMode(false);
			}
		});
	};

	return (
		<div className="editUserForm">
			{showPasswordMatchingError ? (
				<p style={{ color: "red" }}>Passwords do not match</p>
			) : (
				""
			)}
			{showDuplicateEmailError ? (
				<p style={{ color: "red" }}>
					User with this email already exists
				</p>
			) : (
				""
			)}{" "}
			<Form noValidate validated={validated} onSubmit={validateForm}>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						required
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						type="text"
					/>
					<Form.Control.Feedback type="invalid">
						Please set a username.
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setShowDuplicateEmailError(false);
						}}
						type="text"
					/>
					<Form.Control.Feedback type="invalid">
						Please set the email address.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Phone number</Form.Label>
					<Form.Control
						required
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value);
						}}
						type="text"
					/>
					<Form.Control.Feedback type="invalid">
						Please give the phone number.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						value={address}
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						type="text"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setShowPasswordMatchingError(false);
						}}
						type="password"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password again</Form.Label>
					<Form.Control
						value={passwordRepeat}
						onChange={(e) => {
							setPasswordRepeat(e.target.value);
							setShowPasswordMatchingError(false);
						}}
						type="password"
					/>
				</Form.Group>
				<Button type="submit">Edit User</Button>
			</Form>
		</div>
	);
};

export default EditUserDetailsComponent;
