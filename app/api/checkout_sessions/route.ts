import { getServerSession } from "next-auth"
import Stripe from "stripe"

import { serverEnv } from "@/env/server"
import { Cart } from "@/types/types"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  const userId = session?.user.id ?? null

  try {
    let cart: Cart = await request.json()

    const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${serverEnv.SERVER_URL}/?success=true`,
      cancel_url: `${serverEnv.SERVER_URL}/?canceled=true`,
      automatic_tax: { enabled: true },
      client_reference_id: cart.id,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      line_items: cart.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.title,
            },
            unit_amount: Math.round(item.product.price * 100),
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
    if (error instanceof Error) {
      console.log(error)
      return new Response(JSON.stringify(error), { status: 400 })
    } else {
      console.log(error)
      return new Response(JSON.stringify(error), { status: 400 })
    }
  }
}
