"use client"

import { useState } from "react"
import CreateProductForm from "@/components/products/create-product-form"
import { Dialog } from "@headlessui/react"

export default function CreateProductModal() {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 mx-2 my-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-200"
      >
        Create New Product
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
          <Dialog.Panel className="w-1/2 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <Dialog.Title className="text-xl font-bold text-center text-gray-900 dark:text-gray-200">
              Add a product
            </Dialog.Title>

            <CreateProductForm autofocus onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
