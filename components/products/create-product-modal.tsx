"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"

import { Button } from "@/components/ui/button"
import CreateProductForm from "@/components/products/create-product-form"

export default function CreateProductModal() {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Button
        onClick={openModal}
        className="focus:ring-opacity-50 mx-2 my-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
      >
        Create New Product
      </Button>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-1/2 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
            <Dialog.Title className="text-center text-xl font-bold text-gray-900 dark:text-gray-200">
              Add a product
            </Dialog.Title>

            <CreateProductForm autofocus onClose={closeModal} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
