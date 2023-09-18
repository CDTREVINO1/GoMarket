import dbConnect from "lib/dbConnect";
import Product from "models/product";
import Stripe from "stripe";
import { cache } from "react";

export const createProduct = cache(async (productData) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await dbConnect();

    const { name, description, price, category } = productData;

    const handle = name.toLowerCase().replaceAll(" ", "-");

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      handle,
    });

    const stripeProduct = await stripe.products.create({
      id: newProduct._id.toString(),
      name: newProduct.name,
      description: newProduct.description,
    });
    console.log(stripeProduct);

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: newProduct.price * 100,
      currency: "usd",
    });
    console.log(stripePrice);

    newProduct.stripePriceId = stripePrice.id;
    await newProduct.save();
  } catch (error) {
    console.log(error);
  }
});

export const updateProduct = cache(async (product) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await dbConnect();

    const { _id, name, description, price } = product;

    const updatedProduct = await Product.findByIdAndUpdate(_id, {
      name,
      description,
      price,
    });

    console.log(updatedProduct);

    if (updatedProduct._id) {
      await stripe.prices.update(updatedProduct.stripePriceId, {
        active: false,
      });

      const newPrice = await stripe.prices.create({
        product: _id,
        unit_amount: price * 100,
        currency: "usd",
      });
      console.log(newPrice);

      await stripe.products.update(_id, {
        name: name,
        description: description,
        default_price: newPrice.id,
      });

      updatedProduct.stripePriceId = newPrice.id;
      updatedProduct.save();
    }
  } catch (error) {
    console.log(error);
  }
});

export const archiveProduct = cache(async (productId, isAvailable) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await dbConnect();

    const productToArchive = await Product.findByIdAndUpdate(productId, {
      availability: !isAvailable,
    });

    if (productToArchive.stripePriceId) {
      await stripe.products.update(productToArchive._id.toString(), {
        active: !isAvailable,
      });
      await stripe.prices.update(productToArchive.stripePriceId, {
        active: !isAvailable,
      });
    }

    console.log(productToArchive);
  } catch (error) {
    console.log(error);
  }
});
