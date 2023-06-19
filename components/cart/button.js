"use client";

import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import CartIcon from "../icons/cart";
import CartModal from "../cart/modal";

export default function CartButton({ cart, cartIdUpdated }) {
  const [, setCookie] = useCookies(["cartId"]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const quantityRef = useRef("0");
  const totalQuantity = 0;

  //  FIXME: const quantityRef = useRef(cart.totalQuantity);
  useEffect(() => {
    if (cartIdUpdated) {
      setCookie("cartId", cart._id, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return;
  }, [setCookie, cartIdUpdated, cart._id]);

  useEffect(() => {
    // Open cart modal when when quantity changes.
    if (totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!cartIsOpen) {
        setCartIsOpen((prevState) => !prevState);
      }

      // Always update the quantity reference
      quantityRef.current = totalQuantity;
    }
  }, [cartIsOpen, totalQuantity, quantityRef]);

  return (
    <>
      <CartModal
        isOpen={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
        cart={cart}
      />

      <button
        aria-label="Open cart"
        onClick={() => {
          setCartIsOpen(true);
        }}
        className="relative right-0 top-0"
        data-testid="open-cart"
      >
        <CartIcon quantity="0" />
        {/* FIXME: <CartIcon quantity={cart.totalQuantity} /> */}
      </button>
    </>
  );
}
