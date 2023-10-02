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
      <button onClick={openModal}>
        <a
          href="#_"
          className="group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-red-500 px-5 py-3 font-medium transition-all">
          <span className="absolute right-0 top-0 inline-block h-4 w-4 rounded bg-red-700 transition-all duration-500 ease-in-out group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rotate-45 bg-white"></span>
          </span>
          <span className="group-hover:translate-x absolute bottom-0 left-0 h-full w-full -translate-x-full translate-y-full rounded-2xl bg-red-600 transition-all delay-200 duration-500 ease-in-out group-hover:mb-12"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            {conditionText}
          </span>
        </a>
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="max-w-lg rounded-lg bg-white p-4 shadow-lg ">
            <Dialog.Title className="text-center text-xl font-bold">
              {conditionText} Product
            </Dialog.Title>

            {isAvailable ? (
              <p>
                Archiving will hide this product from new purchases. Are you
                sure you want to archive this product?
              </p>
            ) : (
              <p>
                Unarchiving will reveal this product for new purchases. Are you
                sure you want to unarchive this product?
              </p>
            )}

            <div className="mt-4 text-center">
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={closeModal}>
                Cancel
              </button>

              <button
                className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  handleArchiveProduct(productId, isAvailable);
                  router.refresh();
                  closeModal();
                }}>
                {conditionText}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
