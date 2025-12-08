import { Suspense } from "react"
import Link from "next/link"

import Cart from "@/components/cart/index"
import CartIcon from "@/components/icons/cart"
import { HeaderNav } from "@/components/layout/Nav"

export async function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-primary p-4">
      <div className="mx-auto flex items-center justify-between py-4">
        <Link href="/" className="px-4 text-2xl font-semibold">
          GoMarket
        </Link>

        <div className="flex flex-row space-x-2">
          <div className="md:hidden">
            <Suspense fallback={<CartIcon />}>
              <Cart />
            </Suspense>
          </div>

          <HeaderNav />

          <div className="hidden md:block">
            <Suspense fallback={<CartIcon className="h-6" />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  )
}
