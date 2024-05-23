import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "./BackendService";
import { AppContext } from "./App";

const UserPage = () => {
	const userInfo = useContext(AppContext);
	const [userData, setUserData] = useState({
		id: "",
		email: "",
		username: "",
		phonenumber: "",
		address: "",
	});

	const getData = async () => {
		const data = await getUserDetails(userInfo.state.id);
		console.log(data);
		//setUserData({id: data.id, email: data.email, username: data.username, phonenumber: da})
	};
	useEffect(() => {
		//getData();
	}, []);

	return userInfo.state.loggedIn ? (
		<div>test</div>
	) : (
		"You need to be logged in to view this page"
	);
};

export default UserPage;
