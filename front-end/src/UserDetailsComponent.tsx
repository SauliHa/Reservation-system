import { Button } from "react-bootstrap";
import { User } from "./LoginPage";
import { useContext, useState } from "react";
import { sendDeleteUserRequest } from "./BackendService";
import { AppContext } from "./App";
import { useTranslation } from "react-i18next";
import "./styles/userdetails.css";

const UserDetailsComponent = (props: {
	userData: User;
	changeEditMode: (mode: boolean) => void;
}) => {

	const {t} = useTranslation();
	const [deleteMode, setDeleteMode] = useState(false);
	const userInfo = useContext(AppContext);

	const deleteAccount = () => {
		if (props.userData.id === undefined) {
			return;
		}

		sendDeleteUserRequest(props.userData.id).then((response) => {
			if (response === 200) {
				localStorage.removeItem("token");
				userInfo.hook();
			}
		});
	};

	return (
		<div className="userPageContainer">
			<div className="userDetails">
				<h3 className="mb-3">{t("user-details.user-details")}</h3>
				<p>
					<b>{t("user-details.username")}:</b> {props.userData.username}
				</p>
				<p>
					<b>{t("user-details.email")}:</b> {props.userData.email}
				</p>
				<p>
					<b>{t("user-details.phone-number")}:</b> {props.userData.phone_number}
				</p>
				<p>
					<b>{t("user-details.address")}:</b> {props.userData.address}
				</p>
			</div>
			<div>
				<Button
					variant="primary"
					onClick={() => props.changeEditMode(true)}
					className="userdetailsbuttons mb-3 mt-2"
				>
					{t("user-details.change-user-info")}
				</Button>
				<br />
				{deleteMode ? (
					<>
						<h4>{t("user-details.really-delete")}</h4>
						<Button
							variant="danger"
							onClick={() => deleteAccount()}
							className="userdetailsdeletebuttons"
						>
							{t("user-details.delete")}
						</Button>
						<Button
							variant="secondary"
							onClick={() => setDeleteMode(false)}
							className="userdetailsdeletebuttons"
						>
							{t("user-details.cancel")}
						</Button>
					</>
				) : (
					<Button
						onClick={() => setDeleteMode(true)}
						variant="danger"
						className="userdetailsbuttons mb-3"
					>
						{t("user-details.delete-account")}
					</Button>
				)}
			</div>
		</div>
	);
};

export default UserDetailsComponent;
