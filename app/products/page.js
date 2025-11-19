import ProductsGrid from "@/components/products/products-grid"
import { getProductsByAvailability } from "@/lib/pos/queries/product"

export default async function AllProductsPage() {
  const products = await getProductsByAvailability("available")

  if (!products || products.length === 0) {
    return (
      <div className="product-list-placeholder">
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
