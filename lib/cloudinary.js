import { v2 as cloudinary } from "cloudinary"

import { serverEnv } from "@/env/server"

const cloudinaryConfig = cloudinary.config({
  cloud_name: serverEnv.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: serverEnv.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: serverEnv.CLOUDINARY_SECRET,
  secure: true,
})

export { cloudinaryConfig }
