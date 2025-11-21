import clsx from "clsx"

import ShoppingBagIcon from "@/components/icons/shopping-bag"

export default function openCart({ className, quantity }) {
  return (
    <div>
      <ShoppingBagIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110",
          className
        )}
      />

      {quantity ? (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
