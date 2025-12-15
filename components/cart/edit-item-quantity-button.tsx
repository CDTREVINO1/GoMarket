"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { toast } from "sonner"

import { removeItem, updateItemQuantity } from "@/components/cart/actions"
import MinusIcon from "@/components/icons/minus"
import PlusIcon from "@/components/icons/plus"

import LoadingDots from "../loading-dots"

export default function EditItemQuantityButton({ item, type }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <button
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      onClick={() => {
        startTransition(async () => {
          const error =
            type === "minus" && item.quantity - 1 === 0
              ? await removeItem(item.id)
              : await updateItemQuantity({
                  itemId: item.id,
                  quantity:
                    type === "plus" ? item.quantity + 1 : item.quantity - 1,
                })

          if (error) {
            alert(error)
            return
          }

          router.refresh()
        })
      }}
      disabled={isPending}
      className={clsx(
        "ease flex max-w-[36px] min-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900",
        {
          "cursor-not-allowed": isPending,
          "ml-auto": type === "minus",
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  )
}
