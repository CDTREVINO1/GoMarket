import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCart, createCart } from "../../../../lib/pos/queries/cart";

export async function GET(req) {
  const cartId = cookies().get("cartId")?.value;

  const cart = await getCart(cartId);

  // TODO: Return cart.json()
  return NextResponse.json({ cart });
}

export async function POST() {
  const cart = await createCart();
  cookies().set("cartId", `${cart._id}`);

  return new Response(JSON.stringify(cart));
}
