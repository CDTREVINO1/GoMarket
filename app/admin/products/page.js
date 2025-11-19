import ProductsList from "@/components/products/products-list"
import { getProductsByAvailability } from "@/lib/pos/queries/product"

export default async function HomePage() {
  const products = await getProductsByAvailability()

  return (
    <>
      <ProductsList products={products} />
    </>
  )
}
