import { object, string } from "yup";

// Perform Transformations here
const envSchema = object({
  VITE_API_URL: string().required(),
  VITE_FIREBASE_API_KEY: string().required(),
  VITE_FIREBASE_AUTH_DOMAIN: string().required(),
  VITE_FIREBASE_DB_URL: string().required(),
  VITE_FIREBASE_PROJECT_ID: string().required(),
  VITE_FIREBASE_STORAGE_BUCKET: string().required(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: string().required(),
  VITE_FIREBASE_APP_ID: string().required(),
  VITE_FIREBASE_MEASUREMENT_ID: string().required(),
});

export { envSchema };
