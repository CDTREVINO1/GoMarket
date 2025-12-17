import { cookies } from "next/headers"

import { getCart } from "@/lib/pos/queries/cart"

import CartSheet from "./sheet"

export default async function Cart() {
  const cookieStore = await cookies()
  const cartData = cookieStore.get("cartId")

  const cartResponse = cartData ? await getCart(cartData.value) : null
  const cart = cartResponse?.cart ?? null

  return (
    <CartSheet
      cart={cart}
      totalItems={cartResponse?.totalItems}
      totalPrice={cartResponse?.totalPrice}
    />
  )
}
