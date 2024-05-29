import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "./BackendService";
import { AppContext } from "./App";
import "./styles/userpage.css";
import { User } from "./LoginPage";
import EditUserDetailsComponent from "./EditUserDetailsComponent";
import UserDetailsComponent from "./UserDetailsComponent";
import { useTranslation } from "react-i18next";

const UserPage = () => {
	const {t} = useTranslation();
	const userInfo = useContext(AppContext);
	const [userData, setUserData] = useState<User>({
		id: "",
		email: "",
		username: "",
		phone_number: "",
		address: "",
	});
	const [editMode, setEditMode] = useState(false);

	const changeEditMode = (mode: boolean) => {
		setEditMode(mode);
		getData();
	};

	const getData = async () => {
		if (userInfo.state.id === undefined) {
			return;
		}
		const data = await getUserDetails(userInfo.state.id);
		console.log(data);
		setUserData({
			id: data.id,
			email: data.email,
			username: data.username,
			phone_number: data.phone_number,
			address: data.address,
		});
	};
	useEffect(() => {
		getData();
	}, [userInfo]);

	return userInfo.state.loggedIn ? (
		editMode ? (
			<EditUserDetailsComponent
				userData={userData}
				changeEditMode={changeEditMode}
			/>
		) : (
			<UserDetailsComponent
				userData={userData}
				changeEditMode={changeEditMode}
			/>
		)
	) : (
		t("reservation-calendar-page.need-to-log")
	);
};

export default UserPage;
