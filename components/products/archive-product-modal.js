"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { handleArchiveProduct } from "./actions";

export default function ArchiveProductModal({ productId, isAvailable }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const conditionText = isAvailable ? "Archive" : "Unarchive";

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 mt-4 text-white transition duration-300 bg-red-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
      >
        {conditionText}
      </button>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
          <Dialog.Panel className="max-w-lg p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <Dialog.Title className="text-xl font-bold text-center dark:text-gray-200">
              {conditionText} Product
            </Dialog.Title>

            {isAvailable ? (
              <p className="dark:text-gray-300">
                Archiving will hide this product from new purchases. Are you
                sure you want to archive this product?
              </p>
            ) : (
              <p className="dark:text-gray-300">
                Unarchiving will reveal this product for new purchases. Are you
                sure you want to unarchive this product?
              </p>
            )}

            <div className="mt-4 text-center">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                onClick={() => {
                  handleArchiveProduct(productId, isAvailable);
                  router.refresh();
                  closeModal();
                }}
              >
                {conditionText}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
