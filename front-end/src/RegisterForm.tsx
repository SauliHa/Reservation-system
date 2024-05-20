import { useState } from "react";
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

	const validatePasswords = () => {
		if (password === passwordRepeat) {
			props.register(username, password, email, phone, address);
		} else {
			//todo: viestitä käyttäjälle että salasanat eivät täsmää (esim. input muuttuu punaseksi?)
			console.log("Salasanat eivät täsmää");
		}
	};

	return (
		<div className="accountForm">
			<Form.Group className="mb-3">
				<Form.Label>Username</Form.Label>
				<Form.Control
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
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
					}}
					type="password"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Email</Form.Label>
				<Form.Control
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type="text"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Phone number</Form.Label>
				<Form.Control
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
					}}
					type="text"
				/>
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
			<Button onClick={validatePasswords}>Register</Button>
		</div>
	);
};

export default RegisterForm;
