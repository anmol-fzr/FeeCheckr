import { object, string } from "yup";

const loginSchema = object({
  email: string().email().label("Email address").required(),
  password: string().label("Password").required(),
});

const updateAccountSchema = object({
  email: string().label("Email"),
  password: string().label("Password").required(),
});

export { loginSchema, updateAccountSchema };
