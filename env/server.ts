import { z } from "zod"

export const serverEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  SERVER_URL: z.url(),
  CLOUDINARY_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
})

export const serverEnv = serverEnvSchema.parse(process.env)
