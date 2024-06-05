import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { sendLoginRequest } from "./BackendService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";
import { useTranslation } from "react-i18next";

const LoginForm = (props: { changeRegisterMode: (mode: boolean) => void }) => {

	const { t } = useTranslation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [validated, setValidated] = useState(false);

	const userInfo = useContext(AppContext);

	const navigate = useNavigate();

	const login = (email: string, password: string) => {
		const loginObject = { email: email, password: password };

		sendLoginRequest(loginObject).then((response) => {
			if (response.status === 401 || response.status === 404) {
				setShowErrorMessage(true);
			}
			if (response.status == 200) {
				localStorage.setItem("token", response.data);
				userInfo.hook();
				console.log(response.data);
				navigate("/");
			}
		});
	};

	const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			setValidated(false);
		} else {
			login(email, password);
		}
		setValidated(true);
	};

	return (
		<div className="accountForm">
			{showErrorMessage ? (
				<p style={{ color: "red" }}>{t("login-form.incorrect")}</p>
			) : (
				""
			)}
			<div className="mb-3">
				<Form noValidate validated={validated} onSubmit={validateForm}>
					<Form.Group className="mb-3">
						<Form.Label>{t("login-form.email")}</Form.Label>
						<Form.Control
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setShowErrorMessage(false);
							}}
							type="text"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>{t("login-form.password")}</Form.Label>
						<Form.Control
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setShowErrorMessage(false);
							}}
							type="password"
							required
						/>
					</Form.Group>
					<Button type="submit">{t("login-form.log-in")}</Button>
				</Form>
			</div>
			<div>
				<h3 className="mb-3">{t("login-form.need-account")}</h3>
				<Button variant="dark" onClick={() => props.changeRegisterMode(true)}>
					{t("login-form.register")}
				</Button>
			</div>
		</div>
	);
};

export default LoginForm;
