import { envSchema } from "@/schema"

const env = (import.meta.env)

const envs = await envSchema.validate(env, { abortEarly: true }).then(validEnvs => ({ ...env, ...validEnvs })).catch(err => {
  console.log(err)
  return env
})

export { envs }
