import { PrismaClient } from "@/generated/prisma/client"

const products = require("./products")
const stripe = require("stripe")("") // Stripe secret key

const prisma = new PrismaClient()

const main = async () => {
  console.time("Seeding complete 🌱")

  for (let product of products) {
    const newProduct = await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        availability: product.availability,
        category: product.category,
        images: product.images,
        handle: product.handle,
      },
    })
    const newStripeProduct = await stripe.products.create({
      id: newProduct.id.toString(),
      name: newProduct.title,
      description: newProduct.description,
      tax_code: "txcd_99999999",
    })
    const stripePrice = await stripe.prices.create({
      product: newStripeProduct.id,
      unit_amount_decimal: (newProduct.price * 100).toFixed(12),
      currency: "usd",
      tax_behavior: "exclusive",
    })
    await prisma.product.update({
      where: {
        id: newProduct.id,
      },
      data: {
        stripePriceId: stripePrice.id,
      },
    })
  }

  console.timeEnd("Seeding complete 🌱")
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Process complete")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
