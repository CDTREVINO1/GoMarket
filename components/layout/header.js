import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import Cart from "components/cart/index";
import CartIcon from "components/icons/cart";
import LogoutButton from "./logout-button";
import { authOptions } from "lib/auth";
import HamburgerDropdown from "./hamburger";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-10 w-screen bg-white border-b shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between py-4 mx-auto md:py-0">
        <Link href="/" className="flex items-center">
          <span className="self-center ml-6 text-2xl font-semibold align-left whitespace-nowrap dark:text-white">
            Online-Store
          </span>
        </Link>
        <div className="md:hidden">
          <HamburgerDropdown />
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-hamburger">
          <ul className="flex flex-col mt-4 space-y-2 font-medium rounded-lg dark:border-gray-700 dark:bg-gray-800 md:flex-row md:space-x-8 md:space-y-0">
            <li>
              <Link
                href="/products"
                className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out rounded hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                Products
              </Link>
            </li>
            {!session ? (
              <li>
                <Link
                  href="auth"
                  className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out rounded hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-current="page">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out rounded hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                    Profile
                  </Link>
                </li>
                {session?.user.role === "admin" && (
                  <li>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out rounded hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton />
                </li>
              </>
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
