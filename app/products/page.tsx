import Image from "next/image"
import Link from "next/link"
import { Prisma } from "@/generated/prisma/client"
import placeholderPic from "@/public/placeholder.png"

import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Search from "@/components/layout/Search"
import CategoryFilter from "@/components/products/category-filter"

interface ProductsPageProps {
  searchParams: Promise<{ categories?: string; query?: string }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams
  const selectedCategories = params.categories
    ? params.categories.split(",").filter(Boolean)
    : []

  const searchQuery = params.query || ""

  const whereClause: Prisma.ProductWhereInput = {
    availability: true,
    ...(searchQuery && {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...(selectedCategories?.length && {
      category: {
        in: selectedCategories,
      },
    }),
  }

  const filteredProducts = await prisma.product.findMany({
    where: whereClause,
  })

  const allProducts = await prisma.product.findMany({
    where: {
      availability: true,
    },
    select: {
      category: true,
    },
  })

  const availableCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ).sort()

  return (
    <section className="flex-1 p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <p>Browse our collection of amazing products</p>
      </div>

      <div className="mb-4 space-y-4">
        <Search />

        <div>
          <span>Showing {filteredProducts.length} products</span>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <CategoryFilter
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          productCounts={allProducts.reduce(
            (acc, product) => {
              const cat = product.category || "Uncategorized"
              acc[cat] = (acc[cat] || 0) + 1
              return acc
            },
            {} as Record<string, number>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <Link key={index} href={`/products/${product.handle}`}>
            <Card>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  className="rounded-t-lg p-8"
                  src={product.images[0] || placeholderPic}
                  alt="product image"
                  height={300}
                  width={300}
                />
                <span>${product.price.toFixed(2)}</span>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredProducts.length === 0 && (
          <div>
            <p>
              {selectedCategories.length > 0
                ? "No products found matching the selected categories."
                : "No products available."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
