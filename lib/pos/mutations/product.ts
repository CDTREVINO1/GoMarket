import Stripe from "stripe"

import { serverEnv } from "@/env/server"
import prisma from "@/lib/prisma"

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

export const createProduct = async (productData: CreateProductInput) => {
  try {
    const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

    const product = await prisma.product.create({
      data: {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        images: productData.images,
        handle: productData.handle,
        availability: productData.availability,
      },
    })

    const stripeProduct = await stripe.products.create({
      id: product.id,
      tax_code: "txcd_99999999",
      name: productData.title,
      description: productData.description,
      images: productData.images.map((img) => img.url),
      metadata: {
        category: productData.category,
        handle: productData.handle,
      },
    })

    // 2. Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(productData.price * 100), // Convert to cents
      currency: "usd",
      tax_behavior: "exclusive",
    })

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        stripePriceId: stripePrice.id,
      },
    })

    return {
      success: true,
      product,
      stripeProduct,
      stripePrice,
    }
  } catch (error) {
    console.log("Error creating product:", error)
    throw error
  }
}

export const updateProduct = async (productData: UpdateProductInput) => {
  try {
    const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

    const existingProduct = await prisma.product.findUnique({
      where: { id: productData.id },
    })

    if (!existingProduct) {
      throw new Error("Product not found")
    }

    if (
      productData.title ||
      productData.description ||
      productData.images ||
      productData.category ||
      productData.handle
    ) {
      // First, get the Stripe product ID from the price
      const stripePrice = await stripe.prices.retrieve(
        existingProduct.stripePriceId
      )
      const stripeProductId = stripePrice.product as string

      await stripe.products.update(stripeProductId, {
        ...(productData.title && { name: productData.title }),
        ...(productData.description && {
          description: productData.description,
        }),
        ...(productData.images && {
          images: productData.images.map((img) => img.url),
        }),
        ...(productData.category || productData.handle
          ? {
              metadata: {
                ...(productData.category && { category: productData.category }),
                ...(productData.handle && { handle: productData.handle }),
              },
            }
          : {}),
      })
    }

    let stripePriceId = existingProduct.stripePriceId
    if (productData.price && productData.price !== existingProduct.price) {
      // Get the Stripe product ID
      const oldStripePrice = await stripe.prices.retrieve(
        existingProduct.stripePriceId
      )
      const stripeProductId = oldStripePrice.product as string

      // Create new price
      const newStripePrice = await stripe.prices.create({
        product: stripeProductId,
        unit_amount: Math.round(productData.price * 100),
        currency: "usd",
      })

      // Archive old price
      await stripe.prices.update(existingProduct.stripePriceId, {
        active: false,
      })

      stripePriceId = newStripePrice.id
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productData.id },
      data: {
        ...(productData.title && { title: productData.title }),
        ...(productData.description && {
          description: productData.description,
        }),
        ...(productData.price && { price: productData.price }),
        ...(productData.category && { category: productData.category }),
        ...(productData.images && { images: productData.images }),
        ...(productData.handle && { handle: productData.handle }),
        ...(productData.availability !== undefined && {
          availability: productData.availability,
        }),
        ...(stripePriceId !== existingProduct.stripePriceId && {
          stripePriceId,
        }),
      },
    })

    return {
      success: true,
      product: updatedProduct,
    }
  } catch (error) {
    console.log("Error updating product:", error)
    throw new Error("Failed to update product")
  }
}

export const archiveProduct = async (
  productId: string,
  isAvailable: boolean
) => {
  try {
    const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

    const productToArchive = await prisma.product.update({
      where: { id: productId },
      data: {
        availability: !isAvailable,
      },
    })

    if (productToArchive.stripePriceId) {
      await stripe.products.update(productToArchive.id.toString(), {
        active: !isAvailable,
      })
      await stripe.prices.update(productToArchive.stripePriceId, {
        active: !isAvailable,
      })
    }
  } catch (error) {
    console.log("Error archiving product:", error)
    throw error
  }
}

export const deleteImage = async (productId: string, imageId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { images: true },
    })

    if (!product) {
      throw new Error("Product not found")
    }

    const currentImages = product.images as Image[]
    const updatedImages = currentImages.filter(
      (img) => img.public_id !== imageId
    )

    // Update the product with the filtered images
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: updatedImages,
      },
    })

    return updatedProduct
  } catch (error) {
    console.log("Error deleting image:", error)
    throw error
  }
}
