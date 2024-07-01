import { object, string } from "yup";

// Perform Transformations here 
const envSchema = object({
  VITE_API_KEY: string().required(),
})

export { envSchema }
