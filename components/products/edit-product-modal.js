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
      <button onClick={openModal}>
        <a
          href="#_"
          className="group relative overflow-hidden rounded-lg border border-gray-100 bg-gray-100 px-5 py-3 font-medium text-gray-600 shadow-inner"
        >
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-blue-500 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-blue-500 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute left-0 top-0 h-0 w-full bg-blue-500 transition-all delay-200 duration-300 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-full bg-blue-500 transition-all delay-200 duration-300 group-hover:h-full"></span>
          <span className="absolute inset-0 h-full w-full bg-blue-500 opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
          <span className="ease relative rounded-lg transition-colors delay-200 duration-300 group-hover:text-white">
            Edit Product
          </span>
        </a>
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="min-w-md max-w-lg rounded-lg bg-white p-4 shadow-lg">
            <Dialog.Title className="text-center text-xl font-bold">
              Edit Product
            </Dialog.Title>

            <EditProductForm autofocus product={product} onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
