import { cache } from "react"

import prisma from "@/lib/prisma"

export const getCart = cache(async (cartId: string) => {
  try {
    if (!cartId) return null

    const cart = await prisma.carts.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })

    if (!cart) return null

    const totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * (item.productData?.price ?? 0),
      0
    )

    return {
      ...cart,
      totalQuantity,
      totalPrice,
    }
  } catch (error) {
    console.error("Error fetching cart:", {
      cartId,
      error,
    })
    throw new Error("Failed to fetch cart")
  }
})

export const doesCartExist = cache(async (cartId) => {
  try {
    const cart = await Cart.findOne({ _id: cartId })
    return !!cart
  } catch (error) {
    console.error("Error checking cart existence:", error)
    return false
  }
})
