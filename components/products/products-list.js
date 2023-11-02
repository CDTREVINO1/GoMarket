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
    <>
      <div className="p-4 mx-auto mb-4 rounded-lg w-fit dark:bg-gray-800">
        <div className="flex mx-auto w-fit">
          <button
            onClick={() => setFilter("all")}
            className={`
      mr-4 rounded-lg border border-blue-500 px-8 py-2 text-center shadow-md focus:outline-none
      ${
        filter === "all"
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500 hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
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
          : "bg-white text-blue-500 hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
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
          : "bg-white text-blue-500 hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
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
              className="max-w-xs p-4 m-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:border-gray-600 dark:bg-gray-700 "
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {product.name}
              </h3>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                ${product.price}
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                Created {dateFormatter.format(Date.parse(product.createdAt))}
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                Updated {dateFormatter.format(Date.parse(product.updatedAt))}
              </p>
              <div className="flex mt-2 space-x-4">
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
    </>
  );
}
