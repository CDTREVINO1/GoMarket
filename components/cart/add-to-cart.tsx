"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { addItem } from "@/components/cart/actions"

import LoadingDots from "../loading-dots"

export function AddToCart({
  productId,
  isAvailable,
  productTitle,
}: {
  productId: string
  isAvailable: boolean
  productTitle: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      aria-label="Add item to cart"
      disabled={isPending}
      onClick={() => {
        if (!isAvailable) return
        startTransition(async () => {
          const error = await addItem(productId)

          if (error) {
            alert(error)
            return
          }

          toast(`${productTitle} has been added to the cart.`)

          router.refresh()
        })
      }}
      className={clsx(
        "mx-auto flex w-full max-w-lg transform-gpu items-center justify-center rounded-lg bg-linear-to-r from-blue-400 to-blue-600 px-10 py-3 text-lg font-semibold text-foreground shadow-md transition-transform hover:scale-105",
        {
          "cursor-not-allowed opacity-60": !isAvailable || isPending,
        }
      )}
    >
      <span>{isAvailable ? "Add To Cart" : "Out Of Stock"}</span>
      {isPending && <LoadingDots className="ml-2" />}
    </Button>
  )
}
