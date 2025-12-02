import prisma from "@/lib/prisma"
import ProductsGrid from "@/components/products/products-grid"

export default async function AllProductsPage() {
  const products = await prisma.products.findMany({
    where: {
      availability: true,
    },
  })

  if (!products || products.length === 0) {
    return (
      <div>
        <p>No products available at the moment.</p>
      </div>
    )
  }

  return (
    <section>
      <ProductsGrid products={products} />
    </section>
  )
}
