import "next"

import { z } from "zod"

import { clientEnvSchema } from "./env/client"
import { serverEnvSchema } from "./env/server"

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof serverEnvSchema>,
        z.infer<typeof clientEnvSchema> {}
  }
}
