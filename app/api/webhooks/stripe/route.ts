import { headers } from "next/headers"
import Stripe from "stripe"

import { serverEnv } from "@/env/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("Stripe-Signature")
  const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      serverEnv.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    } else {
      return new Response(`Webhook Error: ${error}`, { status: 400 })
    }
  }

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as Stripe.Checkout.Session

    const metadata = stripeSession.metadata

    const cartId = metadata?.client_reference_id
    const userId = metadata?.userId
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: true,
      },
    })

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart not found or empty")
    }

    const shippingAddress =
      stripeSession.custom_text.shipping_address?.message ?? null

    if (!userId) {
      await prisma.guestOrder.create({
        data: {
          stripeCheckoutId: stripeSession.id,
          paymentStatus: stripeSession.payment_status,
          orderTotal: stripeSession.amount_total as number,
          currency: stripeSession.currency as string,
          orderStatus: stripeSession.status as string,
          orderItems: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
          shippingAddress: shippingAddress as string,
        },
      })
    }

    if (userId) {
      await prisma.order.create({
        data: {
          userId: userId,
          stripeCheckoutId: stripeSession.id,
          paymentStatus: stripeSession.payment_status,
          orderTotal: stripeSession.amount_total as number,
          currency: stripeSession.currency as string,
          orderStatus: stripeSession.status as string,
          orderItems: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
          shippingAddress: shippingAddress as string,
        },
      })
    }
  }

  return new Response(null, { status: 200 })
}
