"use server"

import { v2 as cloudinary } from "cloudinary"

import { cloudinaryConfig } from "@/lib/cloudinary"
import {
  archiveProduct,
  createProduct,
  deleteImage,
  updateProduct,
} from "@/lib/pos/mutations/product"

type ProductData = {
  name: string
  description: string
  price: number
  category: string
  images: string[]
}

export const handleCreateProduct = async (productData: ProductData) => {
  try {
    await createProduct(productData)
  } catch (error) {
    return new Error("Error creating product.", { cause: error })
  }
}

export const handleUpdateProduct = async (productId: string) => {
  try {
    await updateProduct(productId)
  } catch (error) {
    return new Error("Error updating product.", { cause: error })
  }
}

export const handleArchiveProduct = async (
  productId: string,
  isAvailable: boolean
) => {
  try {
    await archiveProduct(productId, isAvailable)
  } catch (error) {
    return new Error("Error archiving product.", { cause: error })
  }
}

export const deleteImageFromDatabase = async (
  productId: string,
  imageId: string
) => {
  try {
    await deleteImage(productId, imageId)
  } catch (error) {
    return new Error("Error deleting image.", { cause: error })
  }
}

export async function getSignature(public_id: string) {
  const timestamp = Math.round(new Date().getTime() / 1000)

  if (public_id) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, public_id },
      cloudinaryConfig.api_secret
    )

    return { timestamp, signature }
  }

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "products" },
    cloudinaryConfig.api_secret
  )

  return { timestamp, signature }
}

export async function saveToDatabase({
  public_id,
  version,
  signature,
}: {
  public_id: string
  version: string
  signature: string
}) {
  // verify the data
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret
  )

  if (expectedSignature === signature) {
    // safe to write to database
    console.log({ public_id })
  }
}
