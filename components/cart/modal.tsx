"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react"

import { Button } from "@/components/ui/button"
import ShoppingBagIcon from "@/components/icons/shopping-bag"
import Price from "@/components/price"

import CloseCart from "./close-cart"
import DeleteItemButton from "./delete-item-button"
import EditItemQuantityButton from "./edit-item-quantity-button"
import OpenCart from "./open-cart"

export default function CartModal({ cart }) {
  const [isOpen, setIsOpen] = useState(false)
  const quantityRef = useRef(cart?.totalQuantity)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  useEffect(() => {
    // Open cart modal when when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true)
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity
    }
  }, [isOpen, cart?.totalQuantity, quantityRef])

  async function processCheckout() {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      })

      if (!response?.ok) {
        console.log("Something went wrong with the request.")
        throw new Error("Network response was not OK")
      }

      const session = await response.json()
      if (session) {
        window.location.href = session.url
      }
    } catch (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error
      )
    }
  }

  return (
    <>
      <Button
        aria-label="Open cart"
        onClick={openCart}
        data-testid="open-cart"
        size="icon"
        variant="default"
        className="text-foreground"
      >
        <OpenCart quantity={cart?.totalQuantity} />
      </Button>
      <Transition show={isOpen}>
        <Dialog
          onClose={closeCart}
          className="relative z-50"
          data-testid="cart"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col bg-white p-6 text-black md:w-3/5 lg:w-2/5 dark:bg-black dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">My Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="text-black transition-colors hover:text-gray-500 dark:text-gray-100"
                  data-testid="close-cart"
                >
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.items.map((item, i) => {
                      const productUrl = `/product/${item.product.handle}`

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          data-testid="cart-item"
                        >
                          <Link
                            className="flex flex-row space-x-4 py-4"
                            href={productUrl}
                            onClick={closeCart}
                          >
                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                alt={item.product.name}
                                src={item.product.images[0].url}
                              />
                            </div>

                            <div className="flex flex-1 flex-col text-base">
                              <span className="font-semibold">
                                {item.product.name}
                              </span>
                            </div>
                            <Price
                              className="flex justify-end space-y-2 text-right text-sm"
                              amount={item.product.price * item.quantity}
                            />
                          </Link>

                          <div className="flex h-9 flex-row">
                            <DeleteItemButton item={item} />
                            <p className="ml-2 flex w-full items-center justify-center border dark:border-gray-700">
                              <span className="w-full px-2">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="minus" />
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="border-t border-gray-200 pt-2 text-sm text-black dark:text-white">
                    <div className="mb-2 flex items-center justify-between">
                      <p>Subtotal</p>
                      <Price className="text-right" amount={cart?.totalPrice} />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <p>Taxes</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-2 flex items-center justify-between font-bold">
                      <p>Total</p>
                      <Price className="text-right" amount={cart?.totalPrice} />
                    </div>
                  </div>
                  <button
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                    onClick={processCheckout}
                  >
                    Proceed to checkout
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
