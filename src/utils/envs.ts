import { envSchema } from "@/schema"

const env = (import.meta.env)

const getEnv = () => {
  try {
    const e = envSchema.validateSync(env, { abortEarly: true })
    return { ...env, ...e }
  }
  catch (err) {
    console.error(err)
    return env
  }
}

const envs = getEnv()

export { envs }
