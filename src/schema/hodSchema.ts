import { object, string, number } from "yup";

const typeErrMsg = ({ label }: { label: string }) =>
  `${label} must be a number`;

const newHodSchema = object({
  name: string().required().label("Name"),
  mobile: number().required().label("Mobile Number").typeError(typeErrMsg),
  email: string().email().required().label("Email Address"),
  password: string().required().label("Password"),
  deptId: string().required().label("Department"),
});

export { newHodSchema };
