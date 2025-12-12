import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  SERVER_URL: z.url(),
  CLOUDINARY_SECRET: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_KEY: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: z.url(),
  NEXT_PUBLIC_CLOUDINARY_DESTROY_URL: z.url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
})

export const env = envSchema.parse(process.env)
