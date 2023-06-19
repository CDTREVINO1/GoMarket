import dbConnect from "../../dbConnect";
import Cart from "../../../models/cart";
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
    path: "items.productId",
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
