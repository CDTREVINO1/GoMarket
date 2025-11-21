import { getProductsByAvailability } from "@/lib/pos/queries/product"
import ProductsGrid from "@/components/products/products-grid"

export default async function AllProductsPage() {
  const products = await getProductsByAvailability("available")

  if (!products || products.length === 0) {
    return (
      <div>
        <p>No products available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <ProductsGrid products={products} />
    </>
  )
}
