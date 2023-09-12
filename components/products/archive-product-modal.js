"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { handleArchiveProduct } from "./actions";

export default function ArchiveProductModal({ productId }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Archive
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-1/2 rounded-lg bg-white p-4 shadow-lg">
            <Dialog.Title>Archive Product</Dialog.Title>

            <p>
              Archiving will hide this product from new purchases. Are you sure
              you want to archive this product?
            </p>

            <div className="mt-4">
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  handleArchiveProduct(productId);
                }}
              >
                Archive product
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
