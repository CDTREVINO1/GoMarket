import { cache } from "react";
import dbConnect from "lib/dbConnect";
import Product from "models/product";

export const getProduct = cache(async (handle) => {
  await dbConnect();

  const productData = await Product.findOne({ handle: handle });

  const productDataString = JSON.stringify(productData);
  const product = JSON.parse(productDataString);

  return product;
});

export const getProducts = cache(async () => {
  await dbConnect();

  const productsData = await Product.find({});
  const productsDataString = JSON.stringify(productsData);
  const products = JSON.parse(productsDataString);

  return products;
});
