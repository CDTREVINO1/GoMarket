import clsx from "clsx"
import ShoppingBagIcon from "components/icons/shopping-bag"

export default function openCart({ className, quantity }) {
  return (
    <div className="relative flex items-center justify-center mb-3 mr-2 text-black transition-colors border rounded-md h-11 w-11 border-neutral-200 dark:border-neutral-700 dark:text-white">
      <ShoppingBagIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
