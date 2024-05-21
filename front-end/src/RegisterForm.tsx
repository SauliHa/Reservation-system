import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const RegisterForm = (props: {
	register: (
		username: string,
		password: string,
		email: string,
		phone: string,
		address: string
	) => void;
}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [validated, setValidated] = useState(false);

	const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			setValidated(false);
		} else {
			if (password === passwordRepeat) {
				props.register(username, password, email, phone, address);
			} else {
				//todo: viestitä käyttäjälle että salasanat eivät täsmää (esim. input muuttuu punaseksi?)
				console.log("Salasanat eivät täsmää");
			}
		}
		setValidated(true);
	};

	/*const validatePasswords = () => {
		if (
			password === passwordRepeat &&
			password !== "" &&
			passwordRepeat !== ""
		) {
			return true;
		}
		return false;
	};*/

	return (
		<div className="accountForm">
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
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
					/>
					<Form.Control.Feedback type="invalid">
						Please give a password.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password again</Form.Label>
					<Form.Control
						required
						value={passwordRepeat}
						onChange={(e) => {
							setPasswordRepeat(e.target.value);
						}}
						type="password"
						//This validation doesn't really work with HTML5 default validation, figure out better way
						//isValid={validatePasswords()}
					/>
					<Form.Control.Feedback type="invalid">
						Please repeat the password.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
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
				<Button type="submit">Register</Button>
			</Form>
		</div>
	);
};

export default RegisterForm;
