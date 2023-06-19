import dbConnect from "../../dbConnect";
import Cart from "../../../models/cart";
import { cache } from "react";

// May have to use aggregation to calculate and add totalQuantity.
export const getCart = cache(async (cartId) => {
  await dbConnect();

  const cartData = await Cart.findById(cartId);
  const cartDataString = JSON.stringify(cartData);
  const cart = JSON.parse(cartDataString);
  console.log("getCart: ", cart);

  return cart;
});

export const createCart = cache(async () => {
  await dbConnect();

  const cartData = await Cart.create({});
  const cartDataString = JSON.stringify(cartData);
  const cart = JSON.parse(cartDataString);
  console.log("createCart: ", cart);

  return cart;
});
