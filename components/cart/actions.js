"use server";

import { addToCart, removeFromCart, updateCart } from "lib/pos/queries/cart";
import { cookies } from "next/headers";

export const addItem = async (productId) => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId || !productId) {
    return new Error("Missing cartId or productId");
  }
  try {
    await addToCart(cartId, { productId, quantity: 1 });
  } catch (e) {
    return new Error("Error adding item", { cause: e });
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
