import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CartModal({ isOpen, onClose, cart }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial="closed"
          animate="open"
          exit="closed"
          key="dialog"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            variants={{
              open: { opacity: 1, backdropFilter: "blur(0.5px)" },
              closed: { opacity: 0, backdropFilter: "blur(0px)" },
            }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex justify-end" data-testid="cart">
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: { translateX: 0 },
                closed: { translateX: "100%" },
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="flex w-full flex-col bg-white p-8 text-black dark:bg-black dark:text-white md:w-3/5 lg:w-2/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">My Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={onClose}
                  className="text-black transition-colors hover:text-gray-500 dark:text-gray-100"
                  data-testid="close-cart"
                >
                  {/* CloseIcon goes here */}
                </button>
              </div>
              {/* Cart contents conditionally rendered here. */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
