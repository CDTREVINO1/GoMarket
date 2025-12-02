import { cache } from "react"

import prisma from "@/lib/prisma"

export const getProduct = cache(async (handle) => {
  try {
    const productData = await prisma.products.findMany({
      where: {
        handle: handle,
      },
    })
    // const productData = await Product.findOne({ handle: handle })
    const product = JSON.stringify(productData)
    return JSON.parse(product)
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
})
