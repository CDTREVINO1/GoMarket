"use client";

import { useState } from "react";
import ArchiveProductModal from "./archive-product-modal";
import EditProductModal from "./edit-product-modal";

export default function ProductsList({ products }) {
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
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-4 w-fit rounded-lg p-4 ">
      <div className="mx-auto flex w-fit ">
        <button
          onClick={() => setFilter("all")}
          className={`
             mr-4 rounded-lg border border-blue-500 px-8 py-2 text-center shadow-md focus:outline-none
            ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-50"
            }
          `}
        >
          All
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`
             mr-4 rounded-lg border border-blue-500 px-4 py-2 text-center shadow-md focus:outline-none
            ${
              filter === "available"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-50"
            }
          `}
        >
          Available
        </button>
        <button
          onClick={() => setFilter("archived")}
          className={`
           rounded-lg border border-blue-500 px-4 py-2 text-center shadow-md focus:outline-none
            ${
              filter === "archived"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-50"
            }
          `}
        >
          Archived
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts()?.map((product) => (
          <li
            key={product._id}
            className="m-2 max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow-lg "
          >
            <h3 className="text-xl font-semibold text-gray-800 ">
              {product.name}
            </h3>
            <p className="text-lg font-semibold text-blue-600 ">
              ${product.price}
            </p>
            <p className="text-gray-500">
              Created {dateFormatter.format(Date.parse(product.createdAt))}
            </p>
            <p className="text-gray-500">
              Updated {dateFormatter.format(Date.parse(product.updatedAt))}
            </p>
            <div className="mt-2 flex space-x-4 ">
              <EditProductModal product={product} />
              <ArchiveProductModal
                productId={product._id}
                isAvailable={product.availability}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
