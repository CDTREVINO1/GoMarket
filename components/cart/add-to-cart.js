"use client";

import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import LoadingDots from "../loading-dots";

export function AddToCart({ productId, availableForSale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Add item to cart"
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(productId);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      className={clsx(
        "mx-auto mb-20 mt-20 flex w-full max-w-lg transform-gpu items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-md transition-transform hover:scale-105 dark:bg-gray-800",
        {
          "cursor-not-allowed opacity-60": !availableForSale || isPending,
        }
      )}>
      <span>{availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
      {isPending && <LoadingDots className="ml-2" />}
    </button>
  );
}
