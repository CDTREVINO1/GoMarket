import { cookies } from "next/headers"

import { getCart } from "@/lib/pos/queries/cart"

import CartSheet from "./sheet"

export default async function Cart() {
  const cookieStore = await cookies()
  const cartData = cookieStore.get("cartId")

  let cart

  if (cartData) {
    cart = await getCart(cartData.value)
  }

  return <CartSheet cart={cart} />
}
