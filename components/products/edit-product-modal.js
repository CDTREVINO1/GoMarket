"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import EditProductForm from "./edit-product-form";

export default function EditProductModal({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Edit Product
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-1/2 rounded-lg bg-white p-4 shadow-lg">
            <Dialog.Title>Edit Product</Dialog.Title>

            <EditProductForm
              autofocus
              product={product}
              onSubmit={closeModal}
            />

            <div className="mt-4">
              <button
                className="ml-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
