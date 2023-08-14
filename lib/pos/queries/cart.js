import dbConnect from "lib/dbConnect";
import Cart from "models/cart";
import Product from "models/product";
import { cache } from "react";
import mongoose from "mongoose";

export const getCart = cache(async (cartId) => {
  await dbConnect();

  const cartData = await Cart.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(cartId) } },
    {
      $set: {
        totalQuantity: {
          $sum: "$items.quantity",
        },
      },
    },
  ]);
  await Cart.populate(cartData, {
    path: "items.product",
  });

  const cartDataString = JSON.stringify(cartData[0]);
  const cart = JSON.parse(cartDataString);

  return cart;
});

export const createCart = cache(async () => {
  await dbConnect();

  const cartData = await Cart.create({});
  const cartDataString = JSON.stringify(cartData);
  const cart = JSON.parse(cartDataString);

  return cart;
});

export const addToCart = cache(async (cartId, productToAdd) => {
  try {
    await dbConnect();

    const product = await Product.findById(productToAdd.productId);

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, "items.product": { $ne: product._id } },
      {
        $addToSet: {
          items: { product: product._id, quantity: productToAdd.quantity },
        },
      }
    );

    if (!updatedCart) {
      const incrementedCart = await Cart.findOneAndUpdate(
        { _id: cartId, "items.product": product._id },
        {
          $inc: { "items.$.quantity": productToAdd.quantity },
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

export const updateCart = cache(async (cartId, item) => {
  try {
    await dbConnect();
    const query = { _id: cartId, "items._id": item.itemId };
    await Cart.findOneAndUpdate(query, {
      $set: { "items.$.quantity": item.quantity },
    });
  } catch (e) {
    console.log(e);
  }
});

export const removeFromCart = cache(async (cartId, itemId) => {
  try {
    await dbConnect();
    await Cart.findByIdAndUpdate(cartId, { $pull: { items: { _id: itemId } } });
  } catch (e) {
    console.log(e);
  }
});
