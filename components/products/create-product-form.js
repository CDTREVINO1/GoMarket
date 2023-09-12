"use client";

import { useRef, useState } from "react";
import { handleCreateProduct } from "./actions";
import { useRouter } from "next/navigation";

export default function CreateProductForm({ onSubmit }) {
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
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

    if (!categoryInputRef.current.value.trim()) {
      newErrors.category = "A category is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFormRefs = () => {
    nameInputRef.current.value = "";
    descInputRef.current.value = "";
    priceInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const newProduct = {
        name: nameInputRef.current.value,
        description: descInputRef.current.value,
        price: priceInputRef.current.value,
        category: categoryInputRef.current.value,
      };

      handleCreateProduct(newProduct);

      clearFormRefs();

      router.refresh();
      onSubmit();
    }
  };

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" ref={nameInputRef} />
      {errors.name && <p className="text-red-600">{errors.name}</p>}

      <label htmlFor="description">Description:</label>
      <textarea ref={descInputRef} />
      {errors.description && (
        <p className="text-red-600">{errors.description}</p>
      )}

      <label htmlFor="price">Price: $</label>
      <input type="number" ref={priceInputRef} />
      {errors.price && <p className="text-red-600">{errors.price}</p>}

      {/* FIXME: This probably has to be a dropdown. */}
      <label htmlFor="category">Category:</label>
      <input type="text" ref={categoryInputRef} />
      {errors.category && <p className="text-red-600">{errors.category}</p>}

      {/* TODO: Add a way to add product images. */}
      {/* <label>
        Images:
        <input type="text" />
      </label> */}

      <button
        className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        type="button"
        onClick={handleSubmit}
      >
        Create Product
      </button>
    </form>
  );
}
