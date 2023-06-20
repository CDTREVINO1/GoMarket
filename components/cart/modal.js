import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import CloseIcon from "../icons/close";
import ShoppingBagIcon from "../icons/shopping-bag";
import DeleteItemButton from "./delete-item-button";
import EditItemQuantityButton from "./edit-item-quantity-button";

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
                  <CloseIcon className="h-7" />
                </button>
              </div>

              {cart.items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : null}

              {/* TODO: Logic for if cart isn't empty */}
              {cart.items.length !== 0 ? (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto p-6">
                    {cart.items.map((item, i) => {
                      return (
                        <li key={i} data-testid="cart-item">
                          {/* <Link className="flex flex-row space-x-4 py-4"> */}
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                            <Image
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={item.productId.name}
                              src={item.productId.images[0]}
                            />
                          </div>
                          <div className="flex flex-1 flex-col text-base">
                            <span className="font-semibold">
                              {item.productId.name}
                            </span>
                          </div>
                          {/* </Link> */}
                          <div className="flex h-9 flex-row">
                            <DeleteItemButton item={item}>
                              <p className="ml-2 flex w-full items-center justify-center border dark:border-gray-700">
                                <span className="w-full px-2">
                                  {item.quantity}
                                </span>
                              </p>
                            </DeleteItemButton>
                            <EditItemQuantityButton item={item} type="minus" />
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
