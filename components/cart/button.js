"use client";

import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export default function CartButton({ cart, cartIdUpdated }) {
  const [, setCookie] = useCookies(["cartId"]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const quantityRef = useRef(cart.totalQuantity);

  return <></>;
}
