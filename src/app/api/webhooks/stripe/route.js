import { headers } from "next/headers";
import Stripe from "stripe";
import Cart from "../../../../../models/cart";

import dbConnect from "../../../../../lib/dbConnect";

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  await dbConnect();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;

  if (event.type === "checkout.session.completed") {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: session.client_reference_id },
      { $set: { items: [] } },
      { returnDocument: "after" }
    );
  }

  return new Response(null, { status: 200 });
}
