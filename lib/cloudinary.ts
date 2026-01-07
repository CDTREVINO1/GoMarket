import { v2 as cloudinary } from "cloudinary"

import { clientEnv } from "@/env/client"
import { serverEnv } from "@/env/server"

const cloudinaryConfig = cloudinary.config({
  cloud_name: clientEnv.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: clientEnv.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: serverEnv.CLOUDINARY_SECRET,
  secure: true,
})

export { cloudinaryConfig }
