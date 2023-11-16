import clsx from "clsx"
import CloseIcon from "components/icons/close"

export default function CloseCart({ className }) {
  return (
    <div className="relative flex items-center justify-center mb-2 text-black transition-colors border rounded-md h-11 w-11 border-neutral-200 dark:border-neutral-700 dark:text-white">
      <CloseIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />
    </div>
  )
}
