"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import CreateProductForm from "components/products/create-product-form";

export default function CreateProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="mx-2 my-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Create New Product
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-1/2 rounded-lg bg-white p-4 shadow-lg">
            <Dialog.Title className="text-center text-xl font-bold">
              Add a product
            </Dialog.Title>

            <CreateProductForm autofocus onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
