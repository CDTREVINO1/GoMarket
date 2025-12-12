import { getServerSession } from "next-auth"
import Stripe from "stripe"

import { authOptions } from "@/lib/auth"
import { env } from "@/lib/env"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  const userId = session?.user?.id ?? null

  try {
    let cart = await request.json()

    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${env.SERVER_URL}/?success=true`,
      cancel_url: `${env.SERVER_URL}/?canceled=true`,
      automatic_tax: { enabled: true },
      client_reference_id: cart._id,
      line_items: cart.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      metadata: {
        userId: userId,
      },
    })

    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error.issues), { status: 422 })
  }
}
