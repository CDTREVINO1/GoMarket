import { cache } from "react";
import dbConnect from "lib/dbConnect";
import Product from "models/product";

export const getProduct = cache(async (handle) => {
  try {
    await dbConnect();

    const productData = await Product.findOne({ handle: handle });
    const product = JSON.stringify(productData);
    return JSON.parse(product);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
});

export const getProductsByAvailability = cache(async (availability = "all") => {
  await dbConnect();
  let query = {};

  if (availability === "available") {
    query = { availability: true };
  } else if (availability === "archived") {
    query = { availability: false };
  }

  try {
    let products = await Product.find(query);
    products = JSON.stringify(products);
    return JSON.parse(products);
  } catch (error) {
    throw error;
  }
});
