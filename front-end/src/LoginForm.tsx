import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = (props: {
	changeRegisterMode: (mode: boolean) => void;
	login: (username: string, password: string) => void;
}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="accountForm">
			<div className="mb-3">
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label>Username</Form.Label>
					<Form.Control
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						type="text"
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
					/>
				</Form.Group>
				<Button onClick={() => props.login(username, password)}>
					Log in
				</Button>
			</div>
			<div>
				<h3 className="mb-3">Need an account?</h3>
				<Button onClick={() => props.changeRegisterMode(true)}>
					Register
				</Button>
			</div>
		</div>
	);
};

export default LoginForm;
