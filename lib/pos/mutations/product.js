import { cache } from "react"
import Stripe from "stripe"

import dbConnect from "@/lib/dbConnect"
import prisma from "@/lib/prisma"

export const createProduct = cache(async (productData) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    await dbConnect()

    const { name, description, price, category, images } = productData
    const handle = name.toLowerCase().replaceAll(" ", "-")

    const newProduct = { name, price, handle }

    if (description) newProduct.description = description
    if (category) newProduct.category = category
    if (images) newProduct.images = images

    const product = await prisma.products.create(newProduct)
    console.log(product)

    newProduct.id = product._id.toString()
    newProduct.tax_code = "txcd_99999999"
    delete newProduct.price
    delete newProduct.handle
    delete newProduct.category
    delete newProduct.images

    // Tax code is currently set to General - Tangible Goods refer to Stripe
    // Docs for different codes https://stripe.com/docs/tax/tax-codes
    const stripeProduct = await stripe.products.create(newProduct)
    console.log(stripeProduct)

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100),
      currency: "usd",
      tax_behavior: "exclusive",
    })
    console.log(stripePrice)

    product.stripePriceId = stripePrice.id
    await product.save()
  } catch (error) {
    console.log("Error creating product:", error)
    throw error
  }
})

export const updateProduct = cache(async (product) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    await dbConnect()

    const { _id, name, description, category, price, images } = product

    const existingProduct = await prisma.products.find({
      where: {
        id: _id,
      },
    })

    const updatedFields = {}
    if (name !== existingProduct.name) updatedFields.name = name
    if (description !== existingProduct.description)
      updatedFields.description = description
    if (category !== existingProduct.category) updatedFields.category = category
    if (price !== existingProduct.price) updatedFields.price = price

    if (existingProduct.images.length === 0 && images)
      updatedFields.images = images

    if (existingProduct.images.length > 0 && images) {
      const mergedImages = [...existingProduct.images, ...images]
      updatedFields.images = mergedImages
    }

    if (Object.keys(updatedFields).length > 0) {
      const updatedProduct = await prisma.products.update({
        where: { id: _id },
        data: {
          ...updatedFields,
        },
      })

      if (updatedFields.price) {
        await stripe.prices.update(updatedProduct.stripePriceId, {
          active: false,
        })

        const newPrice = await stripe.prices.create({
          product: _id,
          unit_amount: Math.round(price * 100),
          currency: "usd",
        })
        console.log("New Stripe Price created:" + newPrice)

        await stripe.products.update(_id, {
          name: name,
          description: description,
          default_price: newPrice.id,
        })

        updatedProduct.stripePriceId = newPrice.id
        updatedProduct.save()
      }

      if (updatedFields.description) {
        await stripe.products.update(_id, {
          description: updatedFields.description,
        })
      }

      console.log(updatedProduct)
      if (!updatedProduct) throw new Error("Product not found.")
    }
  } catch (error) {
    console.log("Error updating product:", error)
    throw error
  }
})

export const archiveProduct = cache(async (productId, isAvailable) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    await dbConnect()

    const productToArchive = await prisma.products.update({
      where: { id: productId },
      data: {
        availability: !isAvailable,
      },
    })

    if (productToArchive.stripePriceId) {
      await stripe.products.update(productToArchive._id.toString(), {
        active: !isAvailable,
      })
      await stripe.prices.update(productToArchive.stripePriceId, {
        active: !isAvailable,
      })
    }

    console.log(productToArchive)
  } catch (error) {
    console.log("Error archiving product:", error)
    throw error
  }
})

export const deleteImage = cache(async (productId, imageId) => {
  try {
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        images: {
          set:
            (
              await prisma.products.findUnique({
                where: { id: productId },
                select: { images: true },
              })
            )?.images.filter((img) => img !== imageId) ?? [],
        },
      },
    })

    console.log(updatedProduct)
  } catch (error) {
    console.log("Error deleting image:", error)
    throw error
  }
})
