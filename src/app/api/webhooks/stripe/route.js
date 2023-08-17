import { headers } from "next/headers";
import Stripe from "stripe";
import Cart from "models/cart";
import User from "models/user";
import GuestOrder from "models/guest-order";
import Order from "models/order";

import dbConnect from "lib/dbConnect";

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

  const stripeSession = event.data.object;

  if (
    !stripeSession?.metadata?.userId &&
    event.type === "checkout.session.completed"
  ) {
    const cart = await Cart.findOneAndUpdate(
      { _id: stripeSession.client_reference_id },
      { $set: { items: [] } },
      { returnDocument: "before" }
    );

    const newGuestOrder = await GuestOrder.create({
      stripeCheckoutId: stripeSession.id,
      paymentStatus: stripeSession.payment_status,
      orderTotal: stripeSession.amount_total,
      currency: stripeSession.currency,
      orderStatus: stripeSession.status,
      orderDate: stripeSession.created,
      orderItems: cart.items.map((item) => {
        return {
          product: item.product,
          quantity: item.quantity,
        };
      }),
      shippingAddress: stripeSession.shipping_details,
    });
  }

  if (
    stripeSession?.metadata?.userId &&
    event.type === "checkout.session.completed"
  ) {
    console.log(stripeSession);

    const cart = await Cart.findOneAndUpdate(
      { _id: stripeSession.client_reference_id },
      { $set: { items: [] } },
      { returnDocument: "before" }
    );
    const user = await User.findById(stripeSession?.metadata?.userId);

    const newOrder = await Order.create({
      user: user._id,
      stripeCheckoutId: stripeSession.id,
      paymentStatus: stripeSession.payment_status,
      orderTotal: stripeSession.amount_total,
      currency: stripeSession.currency,
      orderStatus: stripeSession.status,
      orderDate: stripeSession.created,
      orderItems: cart.items.map((item) => {
        return {
          product: item.product,
          quantity: item.quantity,
        };
      }),
      shippingAddress: stripeSession.shipping_details,
    });

    await user.orders.push(newOrder);
    await user.save();
  }

  return new Response(null, { status: 200 });
}
