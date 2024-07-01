import { object, string } from "yup";

// Perform Transformations here 
const envSchema = object({
  VITE_API_URL: string().url().required(),
})

export { envSchema }
