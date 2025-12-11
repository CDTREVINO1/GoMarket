"use client"

import { Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import LogoutButton from "@/components/layout/logout-button"

export const HeaderNav = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.refresh()
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="hidden items-center gap-4 md:flex">
        {!session ? (
          <Fragment>
            <Button className="text-foreground" variant="default" asChild>
              <Link href="/products">Products</Link>
            </Button>
            <Button className="text-foreground" variant="default" asChild>
              <Link href="auth">Login</Link>
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button className="text-foreground" variant="default" asChild>
              <Link href="/products">Products</Link>
            </Button>

            <Button className="text-foreground" variant="default" asChild>
              <Link href="/profile">Profile</Link>
            </Button>

            {session?.user?.role === "admin" && (
              <Button className="text-foreground" variant="default" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
            )}

            <LogoutButton />
          </Fragment>
        )}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-foreground" variant="default" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              <SheetDescription>Where do you want to go next?</SheetDescription>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4 px-6">
              <SheetClose asChild>
                <Button className="text-foreground" variant="default" asChild>
                  <Link href="/products">Products</Link>
                </Button>
              </SheetClose>
              {!session ? (
                <SheetClose asChild>
                  <Button className="text-foreground" asChild>
                    <Link href="/auth">Login</Link>
                  </Button>
                </SheetClose>
              ) : (
                <Fragment>
                  <SheetClose asChild>
                    <Button
                      className="text-foreground"
                      variant="default"
                      asChild
                    >
                      <Link href="/profile">Profile</Link>
                    </Button>
                  </SheetClose>

                  {session?.user?.role === "admin" && (
                    <SheetClose asChild>
                      <Button
                        className="text-foreground"
                        variant="default"
                        asChild
                      >
                        <Link href="/admin">Admin</Link>
                      </Button>
                    </SheetClose>
                  )}

                  <SheetClose asChild>
                    <Button
                      className="text-foreground"
                      variant="default"
                      onClick={handleSignOut}
                    >
                      Logout
                    </Button>
                  </SheetClose>
                </Fragment>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
