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
        $unwind: "$items", // Unwind the items array to work with individual items
      },
      {
        $lookup: {
          from: "products", // Replace with your products collection name
          localField: "items.product",
          foreignField: "_id",
          as: "items.productData",
        },
      },
      {
        $unwind: "$items.productData", // Unwind the productData array
      },
      {
        $group: {
          _id: "$_id", // Group by cart ID
          totalQuantity: { $sum: "$items.quantity" }, // Calculate total quantity
          totalPrice: {
            $sum: {
              $multiply: ["$items.quantity", "$items.productData.price"],
            },
          }, // Calculate total price
          items: { $push: "$items" }, // Reassemble the items array
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
