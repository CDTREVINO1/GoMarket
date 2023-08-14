"use server";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/pos/queries/cart";
import { cookies } from "next/headers";

export const addItem = async (productId) => {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !productId) {
    cart = await createCart();
    cartId = cart._id;
    cookies().set("cartId", cartId);
  }

  if (!productId) return new Error("Missing productId");

  try {
    await addToCart(cartId, { productId, quantity: 1 });
  } catch (e) {
    return new Error("Error adding item to cart", { cause: e });
  }
};

export const removeItem = async (itemId) => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    await removeFromCart(cartId, itemId);
  } catch (e) {
    return new Error("Error removing item", { cause: e });
  }
};

export const updateItemQuantity = async ({ itemId, quantity }) => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    await updateCart(cartId, {
      itemId,
      quantity,
    });
  } catch (e) {
    return new Error("Error updating item quantity", { cause: e });
  }
};
