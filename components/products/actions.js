"use server";

import {
  createProduct,
  archiveProduct,
  updateProduct,
} from "lib/pos/mutations/product";

export const handleCreateProduct = async (productData) => {
  try {
    await createProduct(productData);
  } catch (error) {
    return new Error("Error creating product.", { cause: error });
  }
};

export const handleUpdateProduct = async (productId) => {
  try {
    await updateProduct(productId);
  } catch (error) {
    return new Error("Error updating product.", { cause: error });
  }
};

export const handleArchiveProduct = async (productId, isAvailable) => {
  try {
    await archiveProduct(productId, isAvailable);
  } catch (error) {
    return new Error("Error archiving product.", { cause: error });
  }
};
