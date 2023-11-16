"use server"

import { v2 as cloudinary } from "cloudinary"
import { cloudinaryConfig } from "lib/cloudinary"
import {
  archiveProduct,
  createProduct,
  deleteImage,
  updateProduct,
} from "lib/pos/mutations/product"

export const handleCreateProduct = async (productData) => {
  try {
    await createProduct(productData)
  } catch (error) {
    return new Error("Error creating product.", { cause: error })
  }
}

export const handleUpdateProduct = async (productId) => {
  try {
    await updateProduct(productId)
  } catch (error) {
    return new Error("Error updating product.", { cause: error })
  }
}

export const handleArchiveProduct = async (productId, isAvailable) => {
  try {
    await archiveProduct(productId, isAvailable)
  } catch (error) {
    return new Error("Error archiving product.", { cause: error })
  }
}

export const deleteImageFromDatabase = async (productId, imageId) => {
  try {
    await deleteImage(productId, imageId)
  } catch (error) {
    return new Error("Error deleting image.", { cause: error })
  }
}

export async function getSignature(public_id) {
  const timestamp = Math.round(new Date().getTime() / 1000)

  if (public_id) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, public_id },
      cloudinaryConfig.api_secret
    )

    return { timestamp, signature }
  }

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "next" },
    cloudinaryConfig.api_secret
  )

  return { timestamp, signature }
}

export async function saveToDatabase({ public_id, version, signature }) {
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
