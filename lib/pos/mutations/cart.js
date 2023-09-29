import dbConnect from "lib/dbConnect";
import Cart from "models/cart";
import Product from "models/product";
import { cache } from "react";

export const createCart = cache(async () => {
  await dbConnect();

  const cartData = await Cart.create({});
  Cart.createIndexes({ expireAt: 1 }, { expireAfterSeconds: 0 });
  const cart = JSON.stringify(cartData);
  return JSON.parse(cart);
});

export const addToCart = cache(async (cartId, productToAdd) => {
  try {
    await dbConnect();

    const product = await Product.findById(productToAdd.productId);

    // Add new item to cart
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, "items.product": { $ne: product._id } },
      {
        $addToSet: {
          items: { product: product._id, quantity: productToAdd.quantity },
        },
        $set: { expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000 },
      }
    );

    // If the item does not exist in the cart, add it as a new item
    if (!updatedCart) {
      const incrementedCart = await Cart.findOneAndUpdate(
        { _id: cartId, "items.product": product._id },
        {
          $inc: { "items.$.quantity": productToAdd.quantity },
          $set: { expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000 },
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
      $set: {
        "items.$.quantity": item.quantity,
        expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

export const removeFromCart = cache(async (cartId, itemId) => {
  try {
    await dbConnect();
    await Cart.findByIdAndUpdate(cartId, {
      $pull: { items: { _id: itemId } },
      $set: { expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000 },
    });
  } catch (e) {
    console.log(e);
  }
});
