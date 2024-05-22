import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import BackendService from "./BackendService";
import { useNavigate } from "react-router-dom";

const LoginForm = (props: { changeRegisterMode: (mode: boolean) => void }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showErrorMessage, setShowErrorMessage] = useState(false);

	const navigate = useNavigate();

	const login = (email: string, password: string) => {
		const loginObject = { email: email, password: password };

		BackendService.login(loginObject).then((response) => {
			if (response.status === 401) {
				setShowErrorMessage(true);
			}
			if (response.status == 200) {
				localStorage.setItem("token", response.data);
				navigate("/");
			}
		});
	};

	return (
		<div className="accountForm">
			{showErrorMessage ? (
				<p style={{ color: "red" }}>Incorrect email or password</p>
			) : (
				""
			)}
			<div className="mb-3">
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setShowErrorMessage(false);
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
							setShowErrorMessage(false);
						}}
						type="password"
					/>
				</Form.Group>
				<Button onClick={() => login(email, password)}>Log in</Button>
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
