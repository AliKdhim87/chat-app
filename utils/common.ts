
import env from "./env.json"

const config =  () => {
  const node_env = process.env.NODE_ENV || "development"
  return env[node_env as keyof typeof env] 
}

export default config