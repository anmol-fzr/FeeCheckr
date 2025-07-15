import { z } from "zod";

// Perform Transformations here
const envSchema = z.object({
	VITE_APP_MODE: z
		.string(z.enum(["DEV", "PROD"]))
		.optional()
		.default("DEV"),

	VITE_API_URL: z.string(),
});

export { envSchema };
