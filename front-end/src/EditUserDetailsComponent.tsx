import { Button, Form } from "react-bootstrap";
import { User } from "./LoginPage";
import { useContext, useState } from "react";
import { sendEditUserRequest } from "./BackendService";
import { AppContext } from "./App";
import { useTranslation } from "react-i18next";

const EditUserDetailsComponent = (props: {
	userData: User;
	changeEditMode: (mode: boolean) => void;
}) => {
	const {t} = useTranslation();
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

	const userInfo = useContext(AppContext);

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
			if (response.status === 401) {
				setShowDuplicateEmailError(true);
			}
			if (response.status === 200) {
				localStorage.setItem("token", response.data);
				userInfo.hook();
				props.changeEditMode(false);
			}
		});
	};

	return (
		<div className="editUserForm">
			{showPasswordMatchingError ? (
				<p style={{ color: "red" }}>{t("passwords-do-not-match")}</p>
			) : (
				""
			)}
			{showDuplicateEmailError ? (
				<p style={{ color: "red" }}>
					{t("duplicate-email-error")}
				</p>
			) : (
				""
			)}{" "}
			<Form noValidate validated={validated} onSubmit={validateForm}>
				<Form.Group className="mb-3">
					<Form.Label>{t("edit-user-details.username")}</Form.Label>
					<Form.Control
						required
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						type="text"
					/>
					<Form.Control.Feedback type="invalid">
						{t("edit-user-details.set-username")}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>{t("edit-user-details.email")}</Form.Label>
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
						{t("edit-user-details.give-email")}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>{t("edit-user-details.phone-number")}</Form.Label>
					<Form.Control
						required
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value);
						}}
						type="text"
					/>
					<Form.Control.Feedback type="invalid">
						{t("edit-user-details.give-phone")}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>{t("edit-user-details.address")}</Form.Label>
					<Form.Control
						value={address}
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						type="text"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>{t("edit-user-details.password")}</Form.Label>
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
					<Form.Label>{t("edit-user-details.password-again")}</Form.Label>
					<Form.Control
						value={passwordRepeat}
						onChange={(e) => {
							setPasswordRepeat(e.target.value);
							setShowPasswordMatchingError(false);
						}}
						type="password"
					/>
				</Form.Group>
				<Button type="submit">{t("edit-user-details.confirm-changes")}</Button>
			</Form>
		</div>
	);
};

export default EditUserDetailsComponent;
