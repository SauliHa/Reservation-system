import request from "supertest";
import { server } from "../index";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();




export const generateToken = (): string => {
	const payload = { id:"3a4d7e60-1860-426d-91f9-0487ba1505b6", username:"user1", email:"test@mail.com", admin:false };
	const secret = process.env.SECRET  as string;
	const options = { expiresIn: "48h" };
	const token = jwt.sign(payload, secret, options);
	return token;
};



describe("POST /login and /register", () => {
	const token = generateToken();
	test("valid registration", async () => {
		const response = await request(server)
			.post("/user/create")
			.send({ username: "user1", password: "password", email: "test@mail.com", phone_number: "1234567", address: "addres" });

		expect(response.status).toBe(200);
		expect(response.text).toContain("Registered as ");
	});

	test("valid login", async () => {
		const response = await request(server)
			.post("/user/login")
			.send({ email: "test@mail.com", password: "password" });
		expect(response.status).toBe(200);
	});

	test("invalid username", async () => {
		const response = await request(server)
			.post("/user/login")
			.send({ email: "test@wrongmail.com", password: "password" });

		expect(response.status).toBe(404);
		expect(response.text).toContain("E-mail not found");
	});

	test("invalid password", async () => {
		const response = await request(server)
			.post("/user/login")
			.send({ email: "test@mail.com", password: "wrongPassword" });

		expect(response.status).toBe(401);
		expect(response.text).toContain("Unauthorized");
	});

	test("get reservations", async () => {
		const response = await request(server)
			.get("/user/3a4d7e60-1860-426d-91f9-0487ba1505b6/reservations")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.text).toContain("[]");
	});

});
