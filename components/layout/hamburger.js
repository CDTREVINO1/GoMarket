"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CartModal from "components/cart/modal";

function HamburgerDropdown({ sessionType }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (isOpen) {
        handleClickOutside(event);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="flex items-center">
        <CartModal className="mr-2 flex text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none" />
        <button
          className="relative mb-3 mr-2 h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
          onClick={toggleDropdown}>
          <svg
            className="m-auto h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 w-full bg-white shadow-lg"
          ref={dropdownRef}>
          <ul className="py-2">
            <li>
              <Link
                href="/products"
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/auth"
                onClick={closeDropdown} // Close the dropdown when this link is clicked
                className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                aria-current="page">
                Login
              </Link>
            </li>

            <li>
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HamburgerDropdown;
