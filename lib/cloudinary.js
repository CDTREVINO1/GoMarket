import { v2 as cloudinary } from "cloudinary"

import { env } from "@/lib/env"

const cloudinaryConfig = cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
  secure: true,
})

export { cloudinaryConfig }
