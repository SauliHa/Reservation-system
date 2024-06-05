import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createUser } from "./BackendService";
import { User } from "./LoginPage";
import { useTranslation } from "react-i18next";
import {
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody
} from "mdb-react-ui-kit";

const RegisterForm = (props: { registerMode:boolean,
	changeRegisterMode: (mode: boolean ) => void;
}) => {
	const {t} = useTranslation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [validated, setValidated] = useState(false);
	const [showPasswordMatchingError, setShowPasswordMatchingError] =
		useState(false);
	const [showDuplicateEmailError, setShowDuplicateEmailError] =
		useState(false);
	
	const [success, setSuccess] = useState(false);


	const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			setValidated(false);
		} else {
			if (password === passwordRepeat) {
				register(username, password, email, phone, address);
			} else {
				setShowPasswordMatchingError(true);
			}
		}
		setValidated(true);
	};

	const register = (
		username: string,
		password: string,
		email: string,
		phone: string,
		address: string
	) => {
		const newUser: User = {
			username: username,
			email: email,
			password: password,
			phone_number: phone,
			address: address,
		};
		createUser(newUser).then((response) => {
			if (response === 401) {
				setShowDuplicateEmailError(true);
			}
			if (response === 201) {
				setSuccess(true);
			}
		});
	};

	return (
		<>
			<MDBModal open={props.registerMode} tabIndex='-1' onClose={() => props.changeRegisterMode(false)}>
				<MDBModalDialog size='xl'>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>{t("register-form.title")}</MDBModalTitle>
						</MDBModalHeader>
						<MDBModalBody>
							{success? 
								<div>
									<h3>{t("register-form.success")}</h3>
									<Button onClick={() => {props.changeRegisterMode(false);}}>Close</Button>
								</div>
								: 
								<div className="accountForm">
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
									)}
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
													setShowPasswordMatchingError(false);
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
													setShowPasswordMatchingError(false);
												}}
												type="password"
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
													setShowDuplicateEmailError(false);
												}}
												type="email"
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
							}
						</MDBModalBody>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
			
		</>
	);
};

export default RegisterForm;
