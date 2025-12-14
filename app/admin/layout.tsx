import Link from "next/link"
import { redirect } from "next/navigation"
import { Menu } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") redirect("/")

  return (
    <div className="flex flex-1">
      <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
        <h2 className="border-b p-4 text-lg font-semibold">Admin Panel</h2>
        <nav className="flex-1 p-4">
          <ol className="space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="flex max-w-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="p-0">
                <SheetHeader>
                  <SheetTitle>Admin Panel</SheetTitle>
                  <SheetDescription />
                </SheetHeader>
                <nav className="space-y-2 p-4">
                  <ol className="space-y-4">
                    {navLinks.map((link, index) => (
                      <li key={index}>
                        <SheetClose asChild>
                          <Link href={link.href}>{link.label}</Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ol>
                </nav>
              </SheetContent>
            </Sheet>

            <h1 className="text-lg font-semibold">Admin</h1>
          </div>
        </header>

        <main className="flex-1 bg-muted/40 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

const navLinks = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/users",
    label: "Users",
  },
  {
    href: "/admin/products",
    label: "Products",
  },
]
