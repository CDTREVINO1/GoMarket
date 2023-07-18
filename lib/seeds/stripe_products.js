const stripe = require("stripe"); // Needs secret key
const products = require("../seeds/output");

async function seedProducts() {
  try {
    for (let product of products) {
      await stripe.products.create({
        name: product.name,
        default_price_data: {
          unit_amount: product.price * 100,
          currency: "usd",
        },
        expand: ["default_price"],
      });
    }

    console.log("Successfully seeded products to Stripe.");
  } catch (e) {
    console.log(e);
  }
}

seedProducts();
