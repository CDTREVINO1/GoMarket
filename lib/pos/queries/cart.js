import dbConnect from "lib/dbConnect";
import Cart from "models/cart";
import { cache } from "react";
import mongoose from "mongoose";

export const getCart = cache(async (cartId) => {
  try {
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

    if (!cartData || cartData.length === 0) return null;

    const cart = JSON.stringify(cartData[0]);

    return JSON.parse(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
});

export const doesCartExist = cache(async (cartId) => {
  try {
    const cart = await Cart.findOne({ _id: cartId });
    return !!cart;
  } catch (error) {
    console.error("Error checking cart existence:", error);
    return false;
  }
});
