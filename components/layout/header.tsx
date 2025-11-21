import { Suspense } from "react"
import Link from "next/link"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import Cart from "@/components/cart/index"
import CartIcon from "@/components/icons/cart"

import HamburgerDropdown from "./hamburger"
import LogoutButton from "./logout-button"

export async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="sticky top-0 z-10 w-screen border-b bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex items-center justify-between py-4 md:py-0">
        <Link href="/" className="flex items-center">
          <span className="align-left ml-6 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Online-Store
          </span>
        </Link>
        <div className="md:hidden">
          <HamburgerDropdown />
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-hamburger">
          <ul className="mt-4 flex flex-col space-y-2 rounded-lg font-medium md:flex-row md:space-y-0 md:space-x-8 dark:border-gray-700 dark:bg-gray-800">
            <li>
              <Link
                href="/products"
                className="block rounded px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Products
              </Link>
            </li>
            {!session ? (
              <li>
                <Link
                  href="auth"
                  className="block rounded px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="block rounded px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                {session?.user.role === "admin" && (
                  <li>
                    <Link
                      href="/admin"
                      className="block rounded px-4 py-2 text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                    >
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
  )
}
