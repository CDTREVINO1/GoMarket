"use server"

import { v2 as cloudinary } from "cloudinary"

import { cloudinaryConfig } from "@/lib/cloudinary"
import {
    archiveProduct,
    createProduct,
    deleteImage,
    updateProduct,
} from "@/lib/pos/mutations/product"

type Image = {
    public_id: string
    url: string
}

type CreateProductInput = {
    title: string
    description: string
    price: number
    category: string
    images: Image[]
    handle: string
    availability: boolean
}

type UpdateProductInput = {
    id: string
    title?: string
    description?: string
    price?: number
    category?: string
    images?: Image[]
    handle?: string
    availability?: boolean
}

export const handleCreateProduct = async (productData: CreateProductInput) => {
    try {
        await createProduct(productData)
    } catch (error) {
        return new Error("Error creating product.", { cause: error })
    }
}

export const handleUpdateProduct = async (productData: UpdateProductInput) => {
    try {
        await updateProduct(productData)
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

export async function getSignature(public_id?: string) {
    const timestamp = Math.round(new Date().getTime() / 1000)

    if (public_id) {
        const signature = cloudinary.utils.api_sign_request(
            { timestamp, public_id },
            cloudinaryConfig.api_secret as string
        )

        return { timestamp, signature }
    }

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: "products" },
        cloudinaryConfig.api_secret as string
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
        cloudinaryConfig.api_secret as string
    )

    if (expectedSignature === signature) {
        // safe to write to database
        console.log({ public_id })
    }
}
