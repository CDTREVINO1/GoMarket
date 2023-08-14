import CloseIcon from "components/icons/close";
import clsx from "clsx";

export default function CloseCart({ className }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <CloseIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />
    </div>
  );
}
