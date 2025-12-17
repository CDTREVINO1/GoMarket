import { CartResponse } from "@/types/types"
import prisma from "@/lib/prisma"

export const getCart = async (cartId: string): Promise<CartResponse | null> => {
  try {
    if (!cartId) return null

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })

    if (!cart) return null

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * (item.product.price ?? 0),
      0
    )

    return {
      cart,
      totalItems,
      totalPrice,
    }
  } catch (error) {
    console.error("Error fetching cart:", {
      cartId,
      error,
    })
    throw new Error("Failed to fetch cart")
  }
}

export const doesCartExist = async (cartId: string) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })
    return !!cart
  } catch (error) {
    console.error("Error checking cart existence:", error)
    return false
  }
}
