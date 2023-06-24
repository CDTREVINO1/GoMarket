const mongoose = require("mongoose");
const Product = require("../../models/product");
const products = require("../seeds/output");
const Cart = require("../../models/cart");
const carts = require("../seeds/carts");

const MONGODB_URI =
  "mongodb+srv://cdt-95:b7jHAJE0a787aGaW@cluster0.nc81t.mongodb.net/online-store?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

async function seedCart() {
  await Cart.deleteMany();

  for (let cart of carts) {
    await Cart.create(cart);
  }
}

async function seedProducts() {
  await Product.deleteMany();

  for (let product of products) {
    await Product.create(product);
  }
}

async function seedDB() {
  //   await seedProducts();

  await seedCart();

  db.close();
  console.log("Successfully seeded DB.");
}

seedDB();
