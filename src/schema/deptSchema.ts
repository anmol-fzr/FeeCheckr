import { object, string } from "yup";

const newDeptSchema = object({
  name: string().required().label("Name"),
});

export { newDeptSchema };
