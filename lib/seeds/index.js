const mongoose = require("mongoose")
const Product = require("../../models/product")
const products = require("../seeds/products3")
const stripe = require("stripe")("")

const MONGODB_URI = ""

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
})

async function seedProducts() {
  try {
    await Product.deleteMany()

    for (let product of products) {
      const newProduct = await Product.create(product)
      const newStripeProduct = await stripe.products.create({
        id: newProduct._id.toString(),
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
      newProduct.stripePriceId = stripePrice.id
      await newProduct.save()
    }
  } catch (e) {
    console.log(e)
  }
}

async function seedDB() {
  await seedProducts()

  db.close()
  console.log("Successfully seeded DB.")
}

seedDB()
