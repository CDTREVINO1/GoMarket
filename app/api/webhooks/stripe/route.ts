import { headers } from "next/headers"
import Cart from "@/models/cart"
import GuestOrder from "@/models/guest-order"
import Order from "@/models/order"
import User from "@/models/user"
import Stripe from "stripe"

import { serverEnv } from "@/env/server"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("Stripe-Signature")
  const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      serverEnv.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const stripeSession = event.data.object

  if (
    !stripeSession?.metadata?.userId &&
    event.type === "checkout.session.completed"
  ) {
    // TODO: Switch to prisma
    const cart = await Cart.findOneAndUpdate(
      { _id: stripeSession.client_reference_id },
      { $set: { items: [] } },
      { returnDocument: "before" }
    )

    const newGuestOrder = await GuestOrder.create({
      stripeCheckoutId: stripeSession.id,
      paymentStatus: stripeSession.payment_status,
      orderTotal: stripeSession.amount_total,
      currency: stripeSession.currency,
      orderStatus: stripeSession.status,
      orderItems: cart.items.map((item) => {
        return {
          product: item.product,
          quantity: item.quantity,
        }
      }),
      shippingAddress: stripeSession.shipping_details,
    })
  }

  if (
    stripeSession?.metadata?.userId &&
    event.type === "checkout.session.completed"
  ) {
    // TODO: Switch to prisma
    const cart = await Cart.findOneAndUpdate(
      { _id: stripeSession.client_reference_id },
      { $set: { items: [] } },
      { returnDocument: "before" }
    )
    // TODO: Switch to prisma
    const user = await User.findById(stripeSession?.metadata?.userId)

    // TODO: Switch to prisma
    const newOrder = await Order.create({
      user: user._id,
      stripeCheckoutId: stripeSession.id,
      paymentStatus: stripeSession.payment_status,
      orderTotal: stripeSession.amount_total,
      currency: stripeSession.currency,
      orderStatus: stripeSession.status,
      orderItems: cart.items.map((item) => {
        return {
          product: item.product,
          quantity: item.quantity,
        }
      }),
      shippingAddress: stripeSession.shipping_details,
    })

    await user.orders.push(newOrder)
    await user.save()
  }

  return new Response(null, { status: 200 })
}
