import { object, string, number } from "yup";

const phoneNumRegex = /^[6-9]\d{9}$/;

const typeErrMsg = ({ label }: { label: string }) =>
  `${label} must be a number`;

const newHodSchema = object({
  name: string().required().label("Name"),
  mobile: string()
    .required()
    .label("Mobile Number")
    .matches(phoneNumRegex, ({ label }) => `Enter a Valid ${label}`)
    .length(10),
  email: string().email().required().label("Email Address"),
  password: string().required().label("Password"),
  deptId: string().required().label("Department"),
});

const updateHodSchema = newHodSchema.shape({
  name: string().optional(),
  mobile: string().optional(),
  email: string().email().optional(),
  password: string().optional(),
  deptId: string().optional(),
});

export { newHodSchema, updateHodSchema };
