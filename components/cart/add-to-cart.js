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
        "flex w-full items-center justify-center bg-black p-4 text-sm uppercase tracking-wide text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black",
        {
          "cursor-not-allowed opacity-60": !availableForSale,
          "cursor-not-allowed": isPending,
        }
      )}
    >
      <span>{availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
      {isPending ? <LoadingDots className="bg-white dark:bg-black" /> : null}
    </button>
  );
}
