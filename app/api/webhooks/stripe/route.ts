import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

import { serverEnv } from "@/env/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest): Promise<NextResponse> {
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
      console.log(error)
      return NextResponse.json(
        { error: `Webhook error: ${error.message}` },
        { status: 400 }
      )
    } else {
      console.log(error)
      return NextResponse.json(
        { error: `Webhook error: ${error}` },
        { status: 400 }
      )
    }
  }

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as Stripe.Checkout.Session

    const metadata = stripeSession.metadata

    const cartId = stripeSession?.client_reference_id
    const userId = metadata?.userId

    if (!cartId) {
      return NextResponse.json({ error: "Missing cartId" }, { status: 400 })
    }
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
          shippingAddress: stripeSession?.collected_information
            ?.shipping_details?.address
            ? JSON.stringify(
                stripeSession.collected_information.shipping_details.address
              )
            : "",
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
          shippingAddress: stripeSession?.collected_information
            ?.shipping_details?.address
            ? JSON.stringify(
                stripeSession.collected_information.shipping_details.address
              )
            : "",
        },
      })
    }

    const deletedItems = await prisma.cartItem.deleteMany({
      where: {
        cartId: cartId,
      },
    })
  }
  return NextResponse.json({ received: true }, { status: 200 })
}
