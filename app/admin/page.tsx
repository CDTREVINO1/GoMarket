import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { getProductsByAvailability } from "@/lib/pos/queries/product"
import CreateProductModal from "@/components/products/create-product-modal"
import ProductsList from "@/components/products/products-list"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth")

  if (session?.user.role !== "admin")
    return (
      <main>
        You are not authorized to access this page. Return to{" "}
        {
          <Link className="cursor-pointer underline" href="/">
            home
          </Link>
        }
      </main>
    )

  const products = await getProductsByAvailability()

  return (
    <main className="bg-slate-300 dark:bg-gray-600">
      <CreateProductModal />
      <ProductsList products={products} />
    </main>
  )
}
