"use client";

import { useState } from "react";
import ArchiveProductModal from "./archive-product-modal";
import EditProductModal from "./edit-product-modal";

export default async function ProductsList({ products }) {
  const [filter, setFilter] = useState("all");

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const filteredProducts = () => {
    if (filter === "available") {
      return products.filter((product) => product.availability === true);
    } else if (filter === "archived") {
      return products.filter((product) => product.availability === false);
    } else return products;
  };

  if (!products || products.length === 0) {
    return (
      <div className="product-list-placeholder">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={() => setFilter("all")}
          className="flex-grow rounded-lg border border-blue-500 px-4 py-2 text-left text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          All
        </button>
        <button
          onClick={() => setFilter("available")}
          className="flex-grow rounded-lg border border-blue-500 px-4 py-2 text-left text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Available
        </button>
        <button
          onClick={() => setFilter("archived")}
          className="flex-grow rounded-lg border border-blue-500 px-4 py-2 text-left text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Archived
        </button>
      </div>
      <ul>
        {filteredProducts()?.map((product) => (
          <li key={product._id} className="my-2">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>Created {dateFormatter.format(Date.parse(product.createdAt))}</p>
            <p>Updated {dateFormatter.format(Date.parse(product.updatedAt))}</p>
            <EditProductModal product={product} />
            <ArchiveProductModal
              productId={product._id}
              isAvailable={product.availability}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
