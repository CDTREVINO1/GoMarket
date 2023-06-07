import { cookies } from "next/headers";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cartIdUpdated = false;
  let cart;

  // TODO: If the cartId exists, update the cart by fetching from the DB

  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  //  TODO: if the cartId doesn't exist, create the cart and set the
  // cartIdUpdate to true

  //   TODO: return the CartButton with the cart and cartIdUpdated as props
}
