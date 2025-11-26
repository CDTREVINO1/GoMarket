"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog } from "@headlessui/react"

import { Button } from "@/components/ui/button"

import { handleArchiveProduct } from "./actions"

export default function ArchiveProductModal({ productId, isAvailable }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const conditionText = isAvailable ? "Archive" : "Unarchive"

  return (
    <>
      <Button
        onClick={openModal}
        className="focus:ring-opacity-50 dark:focus:ring-opacity-50 mt-4 rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
      >
        {conditionText}
      </Button>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:bg-black dark:opacity-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
            <Dialog.Title className="text-center text-xl font-bold dark:text-gray-200">
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
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                onClick={() => {
                  handleArchiveProduct(productId, isAvailable)
                  router.refresh()
                  closeModal()
                }}
              >
                {conditionText}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
