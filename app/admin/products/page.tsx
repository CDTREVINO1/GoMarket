import { getProductsByAvailability } from "@/lib/pos/queries/product"
import prisma from "@/lib/prisma"
import { PaginationComponent } from "@/components/layout/PaginationComponent"
import Search from "@/components/layout/Search"
import CreateProductModal from "@/components/products/create-product-modal"
import ProductsList from "@/components/products/products-list"

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page, query } = await searchParams
  //   const products = await getProductsByAvailability()

  const currentPage = Number(page) || 1
  const pageSize = 14

  const totalProducts = await prisma.products.count({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  })
  const totalPages = Math.ceil(totalProducts / pageSize)

  const products = await prisma.products.findMany({
    where: { title: { contains: query || "", mode: "insensitive" } },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  return (
    <section className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-bold">Products</h2>

      <article className="flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <Search />
          <CreateProductModal />
        </div>

        <div className="flex-1">
          <ProductsList products={products} />
        </div>

        <div className="mt-auto pt-6">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </article>
    </section>
  )
}
