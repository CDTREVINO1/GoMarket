import { cookies } from "next/headers"

import { getCart } from "@/lib/pos/queries/cart"

import CartSheet from "./sheet"

export default async function Cart() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartSheet cart={cart} />
}
