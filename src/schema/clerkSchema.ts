import { object, string } from "yup";

const phoneNumRegex = /^[6-9]\d{9}$/;

const newClerkSchema = object({
	name: string().required().label("Name"),
	mobile: string()
		.required()
		.label("Mobile Number")
		.matches(phoneNumRegex, ({ label }) => `Enter a Valid ${label}`)
		.length(10),
	email: string().email().required().label("Email Address"),
	password: string().required().label("Password"),
});

const updateClerkSchema = object({
	name: string().optional(),
	mobile: string().optional(),
	email: string().email().optional(),
	password: string().optional(),
});

export { newClerkSchema, updateClerkSchema };
