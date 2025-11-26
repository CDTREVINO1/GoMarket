"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"

import { Button } from "@/components/ui/button"

import EditProductForm from "./edit-product-form"

export default function EditProductModal({ product }) {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Button
        onClick={openModal}
        className="focus:ring-opacity-50 dark:focus:ring-opacity-50 mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
      >
        Edit Product
      </Button>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="max-w-lg min-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
            <Dialog.Title className="text-center text-xl font-bold dark:text-gray-200">
              Edit Product
            </Dialog.Title>

            <EditProductForm autofocus product={product} onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
