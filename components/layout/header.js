import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";

import Cart from "components/cart/index";
import CartIcon from "components/icons/cart";
import LogoutButton from "./logout-button";
import { authOptions } from "lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Online-Store
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-hamburger">
          <ul className="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent">
            <li>
              <Link
                href="/products"
                className="... block rounded py-2 pl-3 pr-4 text-gray-900 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500 lg:hover:scale-110"
              >
                Products
              </Link>
            </li>
            {!session && (
              <li>
                <Link
                  href="auth"
                  className="... block rounded py-2 pl-3 pr-4 text-gray-900 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500 lg:hover:scale-110"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  href="/profile"
                  className="... block rounded py-2 pl-3 pr-4 text-gray-900 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500 lg:hover:scale-110"
                >
                  Profile
                </Link>
              </li>
            )}
            {session && (
              <li>
                <LogoutButton />
              </li>
            )}
            <li>
              <Suspense fallback={<CartIcon className="h-6" />}>
                <Cart />
              </Suspense>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
