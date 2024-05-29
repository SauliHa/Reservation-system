import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema }  from "joi";

export const createUserSchema = Joi.object({
	username: Joi.string().max(30).required(),
	password: Joi.string().required(),
	email: Joi.string().email().required(),
	phone_number: Joi.string().required(),
	address: Joi.string().allow("")
});

export const updateUserSchema = Joi.object({
	id: Joi.string().required(),
	username: Joi.string().max(30).empty("").allow(null),
	password: Joi.string().empty("").allow(null),
	email: Joi.string().email().empty("").allow(null),
	phone_number: Joi.string().empty("").allow(null),
	address: Joi.string().empty("").allow(null)
});

export const loginSchema = Joi.object({
	email: Joi.string().required(),   // string().email().required() to final version
	password: Joi.string().required()
});

export const reservationSchema = Joi.object({
	user_Id: Joi.string().required(),
	lane_id: Joi.string().required(),
	date: Joi.string().required(),
	start_time: Joi.string().required(),
	end_time: Joi.string().required(),
	amount_of_players: Joi.string().allow(null, ""),
	additional_info: Joi.string().allow(null, "")
});

//this is only needed if update reservations feature is in the final product
export const updateReservationSchema = Joi.object({
	user_Id: Joi.string().required(),
	lane_id: Joi.string().empty("").allow(null),
	date: Joi.string().empty("").allow(null),
	start_time: Joi.string().empty("").allow(null),
	end_time: Joi.string().empty("").allow(null),
	amount_of_players: Joi.string().allow(null, ""),
	additional_info: Joi.string().allow(null, "")
});

export const validate = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const validationError = new Error;
			validationError.name = "validationError";
			return next(validationError);
		}
		next();
	};
};
