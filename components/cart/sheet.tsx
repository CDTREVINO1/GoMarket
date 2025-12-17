"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Cart } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ShoppingBagIcon from "@/components/icons/shopping-bag"
import Price from "@/components/price"

import DeleteItemButton from "./delete-item-button"
import EditItemQuantityButton from "./edit-item-quantity-button"
import OpenCart from "./open-cart"

export default function CartSheet({
  cart,
  totalItems,
  totalPrice,
}: {
  cart: Cart | null
  totalItems?: number
  totalPrice?: number
}) {
  const [open, setOpen] = useState(false)

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          data-testid="open-cart"
          size="icon"
          variant="default"
          className="text-foreground hover:scale-110"
        >
          <OpenCart quantity={totalItems} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        {!cart || cart.items.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingBagIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="grow overflow-auto py-4">
              {cart.items.map((item, index: number) => {
                const productUrl = `/products/${item.product.handle}`

                return (
                  <li
                    key={index}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                    data-testid="cart-item"
                  >
                    <Link
                      className="flex flex-row space-x-4 py-4"
                      href={productUrl}
                    >
                      <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={item.product.title}
                          src={item.product.images[0]}
                        />
                      </div>

                      <div className="flex flex-1 flex-col text-base">
                        <span className="font-semibold">
                          {item.product?.title}
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
                        <span className="w-full px-2">{item.quantity}</span>
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
                <Price className="text-right" amount={totalPrice} />
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
      </SheetContent>
    </Sheet>
  )
}
