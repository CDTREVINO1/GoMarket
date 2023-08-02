import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createCart, updateCart, removeFromCart } from "lib/pos/queries/cart";

export async function POST() {
  const cart = await createCart();
  cookies().set("cartId", `${cart._id}`);

  return new Response(JSON.stringify(cart));
}

export async function PUT(req) {
  const cartId = cookies().get("cartId")?.value;
  const { quantity, itemId } = await req.json();

  if (!cartId || !quantity || !itemId) {
    return NextResponse.json(
      { error: "Missing cartId, itemId, or quantity" },
      { status: 400 }
    );
  }
  try {
    await updateCart(cartId, {
      itemId,
      quantity,
    });
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (e) {
      return NextResponse.json({ message: e.message }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(req) {
  const cartId = cookies().get("cartId")?.value;
  const { itemId } = await req.json();
  console.log("itemId in route: " + itemId);

  if (!cartId || !itemId) {
    return NextResponse.json(
      { error: "Missing cartId or itemId" },
      { status: 400 }
    );
  }
  try {
    await removeFromCart(cartId, itemId);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (e) {
      return NextResponse.json({ message: e.message }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}
