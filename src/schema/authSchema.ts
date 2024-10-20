import { object, string } from "yup";

const loginSchema = object({
  email: string().email().label("Email address").required(),
  password: string().label("Password").required(),
});

export { loginSchema };
