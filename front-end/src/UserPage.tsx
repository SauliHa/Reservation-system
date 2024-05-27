import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "./BackendService";
import { AppContext } from "./App";
import "./styles/userpage.css";
import { User } from "./LoginPage";
import EditUserDetailsComponent from "./EditUserDetailsComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UserPage = () => {
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
		"You need to be logged in to view this page"
	);
};

export default UserPage;
