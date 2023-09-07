import dbConnect from "lib/dbConnect";
import Cart from "models/cart";
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
