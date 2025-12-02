import { cache } from "react"

import prisma from "@/lib/prisma"

export const createCart = cache(async () => {
  try {
    const cartData = await prisma.carts.create({})
    // Cart.createIndexes({ expireAt: 1 }, { expireAfterSeconds: 0 })
    const cart = JSON.stringify(cartData)
    return JSON.parse(cart)
  } catch (error) {
    console.log("Error creating cart:", error)
    throw error
  }
})

export const addToCart = cache(
  async (
    cartId: string,
    productToAdd: {
      productId: string
      quantity: number
    }
  ) => {
    try {
      if (productToAdd.quantity < 1) {
        throw new Error("Quantity must be at least 1")
      }

      // 1. Ensure product exists
      const product = await prisma.products.findUnique({
        where: { id: productToAdd.productId },
        select: { id: true, availability: true },
      })

      if (!product) {
        throw new Error("Product not found")
      }

      if (!product.availability) {
        throw new Error("Product is not available")
      }

      const newExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      // 2. Try to ADD product if it does NOT already exist
      const insertResult = await prisma.carts.updateMany({
        where: {
          id: cartId,
          items: {
            none: {
              product: product.id,
            },
          },
        },
        data: {
          expireAt: newExpireAt,
          items: {
            push: {
              product: product.id,
              quantity: productToAdd.quantity,
            },
          },
        },
      })

      // 3. If it already existed → INCREMENT quantity
      if (insertResult.count === 0) {
        const updateResult = await prisma.carts.updateMany({
          where: {
            id: cartId,
            items: {
              some: {
                product: product.id,
              },
            },
          },
          data: {
            expireAt: newExpireAt,
            items: {
              updateMany: {
                where: {
                  product: product.id,
                },
                data: {
                  quantity: {
                    increment: productToAdd.quantity,
                  },
                },
              },
            },
          },
        })

        if (updateResult.count === 0) {
          throw new Error("Cart not found or product mismatch")
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Error adding to cart:", {
        cartId,
        productToAdd,
        error,
      })

      throw new Error(
        error instanceof Error ? error.message : "Failed to add item to cart"
      )
    }
  }
)

export const updateCart = cache(
  async (
    cartId: string,
    item: {
      itemId: string
      quantity: number
    }
  ) => {
    try {
      if (item.quantity < 1) {
        throw new Error("Quantity must be at least 1")
      }

      const updated = await prisma.carts.updateMany({
        where: {
          id: cartId,
          items: {
            some: {
              id: item.itemId,
            },
          },
        },
        data: {
          expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          items: {
            updateMany: {
              where: {
                id: item.itemId,
              },
              data: {
                quantity: item.quantity,
              },
            },
          },
        },
      })

      if (updated.count === 0) {
        throw new Error("Cart or cart item not found")
      }

      return { success: true }
    } catch (error) {
      console.error("Error updating cart:", error)
      throw new Error("Failed to update cart item")
    }
  }
)

export const removeFromCart = cache(async (cartId: string, itemId: string) => {
  try {
    const updated = await prisma.carts.update({
      where: { id: cartId },
      data: {
        expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        items: {
          deleteMany: {
            id: itemId,
          },
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw new Error("Failed to remove item from cart")
  }
})
