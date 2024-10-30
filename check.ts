import { envSchema } from "./src/schema";

const rawEnv = import.meta.env;

envSchema
  .validate(rawEnv)
  .then(() => {
    console.log("envs validated Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.log("env validation Errored");
    console.error(err);
    process.exit(1);
  });
