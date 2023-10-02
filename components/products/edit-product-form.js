"use client";

import { useRef, useState } from "react";
import { handleUpdateProduct } from "./actions";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product, onClose }) {
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!nameInputRef.current.value.trim()) {
      newErrors.name = "A product name is required.";
    }

    if (!descInputRef.current.value.trim()) {
      newErrors.description = "A product description is required";
    }

    if (!priceInputRef.current.value.trim()) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(priceInputRef.current.value) ||
      priceInputRef.current.value <= 0
    ) {
      newErrors.price = "Price must be a valid number or greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFormRefs = () => {
    nameInputRef.current.value = "";
    descInputRef.current.value = "";
    priceInputRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const updatedProduct = {
        _id: product._id,
        name: nameInputRef.current.value,
        description: descInputRef.current.value,
        price: priceInputRef.current.value,
      };

      handleUpdateProduct(updatedProduct);

      clearFormRefs();
      router.refresh();
      onClose();
    }
  };

  return (
    <form className="mt-4">
      <label htmlFor="name" className="block font-semibold text-gray-700">
        Name:
      </label>
      <input
        className="w-full rounded-lg border px-3 py-2 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        id="name"
        ref={nameInputRef}
        defaultValue={product.name}
        required
      />
      {errors.name && <p className="text-red-600">{errors.name}</p>}

      <label
        htmlFor="description"
        className="mt-4 block font-semibold text-gray-700"
      >
        Description:
      </label>
      <textarea
        className="w-full rounded-lg border px-3 py-2 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        id="description"
        ref={descInputRef}
        defaultValue={product.description}
        required
      />
      {errors.description && (
        <p className="text-red-600">{errors.description}</p>
      )}

      <label htmlFor="price" className="mt-4 block font-semibold text-gray-700">
        Price:
      </label>
      <input
        className="w-full rounded-lg border px-3 py-2 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type="number"
        id="price"
        ref={priceInputRef}
        defaultValue={product.price}
        required
      />
      {errors.price && <p className="text-red-600">{errors.price}</p>}

      <div className="mt-4 text-center">
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
          onClick={handleSubmit}
        >
          Save product
        </button>
      </div>
    </form>
  );
}
