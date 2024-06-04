import axios from "axios";
import { User } from "./LoginPage";

const setAuthToken = (token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const userBaseURL = "http://localhost:3000/user";

const createUser = (newUser: User) => {
	const request = axios.post(`${userBaseURL}/create`, newUser);
	return request
		.then((response) => response.status)
		.catch((error) => error.response.status);
};

const sendLoginRequest = (loginObject: { email: string; password: string }) => {
	const request = axios.post(`${userBaseURL}/login`, loginObject);
	return request
		.then((response) => {
			return { status: response.status, data: response.data };
		})
		.catch((error) => {
			return { status: error.response.status, data: "" };
		});
};

const checkToken = (token: string) => {
	const request = axios.get(`${userBaseURL}/token/${token}`);
	return request
		.then((response) => response.data)
		.catch((error) => error.response.data);
};

const getUserDetails = (id: string) => {
	const request = axios.get(`${userBaseURL}/${id}`);
	return request.then((response) => response.data);
};

const getAllUsers = async () => {
	const request = await axios.get(userBaseURL);
	return request;
};

const sendEditUserRequest = (editedUser: User) => {
	const request = axios.put(`${userBaseURL}/${editedUser.id}`, editedUser);
	return request
		.then((response) => {
			return { status: response.status, data: response.data };
		})
		.catch((error) => {
			return { status: error.response.status, data: error };
		});
};

const sendDeleteUserRequest = (id: string) => {
	const request = axios.delete(`${userBaseURL}/${id}`);
	return request
		.then((response) => response.status)
		.catch((error) => error.response.status);
};

const getUserReservations = (id: string) => {
	const request = axios.get(`${userBaseURL}/${id}/reservations`);
	return request.then((response) => response.data);
};

const bowlingBaseURL = "http://localhost:3000/bowling/";
const reservationbaseURL = "http://localhost:3000/reservations/";

const getLanes = async () => {
	const request = await axios.get(bowlingBaseURL);
	return request;
};

const editLane = (id: string, usable: boolean, name?: string) => {
	const requestBody = { name: name, usable: usable };
	const request = axios.put(`${bowlingBaseURL}${id}`, requestBody);
	return request.then((response) => response.status).catch((error) => error);
};

const getReservationInfoByDate = async (date: string) => {
	const request = await axios.get(`${bowlingBaseURL}date/${date}`);
	return request;
};

const createReservation = async (
	user_id: string,
	lane_id: string,
	date: string,
	start_time: string,
	end_time: string,
	amount_of_players: number,
	additional_info: string
) => {
	const postData = {
		user_id: user_id,
		lane_id: lane_id,
		date: date,
		start_time: start_time.toString() + ":00",
		end_time: end_time.toString() + ":00",
		amount_of_players: amount_of_players,
		additional_info: additional_info,
	};
	try {
		const request = await axios.post(
			`${reservationbaseURL}create`,
			postData
		);
		return request;
	} catch (error) {
		return error;
	}
};

const deleteReservation = (id: string) => {
	const request = axios.delete(`${reservationbaseURL}/${id}`);
	return request.then((response) => response.status).catch((error) => error);
};

const updateReservation = (
	id: string,
	playerCount: number,
	additionalInfo: string
) => {
	const requestBody = {
		amount_of_players: playerCount,
		additional_info: additionalInfo,
	};
	const request = axios.put(`${reservationbaseURL}/${id}`, requestBody);
	return request.then((response) => response.status).catch((error) => error);
};

export {
	setAuthToken,
	createUser,
	getLanes,
	getReservationInfoByDate,
	sendLoginRequest,
	checkToken,
	createReservation,
	getUserDetails,
	getAllUsers,
	sendEditUserRequest,
	sendDeleteUserRequest,
	getUserReservations,
	deleteReservation,
	updateReservation,
	editLane,
};
