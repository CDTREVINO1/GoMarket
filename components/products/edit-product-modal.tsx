"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"

import EditProductForm from "./edit-product-form"

export default function EditProductModal({ product }) {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
      >
        Edit Product
      </button>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
          <Dialog.Panel className="max-w-lg p-4 bg-white rounded-lg shadow-lg min-w-md dark:bg-gray-800">
            <Dialog.Title className="text-xl font-bold text-center dark:text-gray-200">
              Edit Product
            </Dialog.Title>

            <EditProductForm autofocus product={product} onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
