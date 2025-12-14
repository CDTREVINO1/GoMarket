import { cache } from "react"

import prisma from "@/lib/prisma"

export const createCart = cache(async () => {
  try {
    const cartData = await prisma.cart.create({
      data: {
        expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })
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
      // Check if the item already exists in the cart
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cartId,
          productId: productToAdd.productId,
        },
      })

      if (existingCartItem) {
        // Item exists, increment the quantity
        const updatedCartItem = await prisma.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + productToAdd.quantity,
          },
        })
        return updatedCartItem
      } else {
        // Item doesn't exist, create a new cart item
        const newCartItem = await prisma.cartItem.create({
          data: {
            cartId: cartId,
            productId: productToAdd.productId,
            quantity: productToAdd.quantity,
          },
        })
        return newCartItem
      }
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

      const updated = await prisma.cart.updateMany({
        where: {
          id: cartId,
          items: {
            some: {
              id: item.itemId,
            },
          },
        },
        data: {
          expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
    const updated = await prisma.cart.update({
      where: { id: cartId },
      data: {
        expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
