"use server"

import { cookies } from "next/headers"

import {
  addToCart,
  createCart,
  removeFromCart,
  updateCart,
} from "@/lib/pos/mutations/cart"
import { doesCartExist, getCart } from "@/lib/pos/queries/cart"

export const setCookie = async (cartId: string) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000
  const cookieStore = await cookies()
  cookieStore.set("cartId", cartId, { expires: Date.now() + oneWeek })
}

export const addItem = async (productId: string) => {
  let cookieStore = await cookies()
  let cartId = cookieStore.get("cartId")?.value
  let cart

  if (cartId) {
    const cartExists = await doesCartExist(cartId)
    if (cartExists) {
      cart = await getCart(cartId)
    } else {
      cart = await createCart()
      cartId = cart.id
      await setCookie(cartId)
    }
  } else {
    cart = await createCart()
    cartId = cart.id
    setCookie(cartId)
  }

  if (!productId) return new Error("Missing productId")

  try {
    await addToCart(cartId, { productId, quantity: 1 })
    setCookie(cartId)
  } catch (e) {
    return new Error("Error adding item to cart", { cause: e })
  }
}

export const removeItem = async (itemId: string) => {
  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")?.value

  if (!cartId) {
    return new Error("Missing cartId")
  }
  try {
    await removeFromCart(cartId, itemId)
  } catch (e) {
    return new Error("Error removing item", { cause: e })
  }
}

export const updateItemQuantity = async ({
  itemId,
  quantity,
}: {
  itemId: string
  quantity: number
}) => {
  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")?.value

  if (!cartId) {
    return new Error("Missing cartId")
  }
  try {
    await updateCart(cartId, {
      itemId,
      quantity,
    })
  } catch (e) {
    return new Error("Error updating item quantity", { cause: e })
  }
}
