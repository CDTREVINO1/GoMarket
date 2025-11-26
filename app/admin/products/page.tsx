import { getProductsByAvailability } from "@/lib/pos/queries/product"
import CreateProductModal from "@/components/products/create-product-modal"
import ProductsList from "@/components/products/products-list"

export default async function AdminProductsPage() {
  const products = await getProductsByAvailability()
  return (
    <section>
      <h2>Products</h2>

      <article>
        <CreateProductModal />
        <ProductsList products={products} />
      </article>
    </section>
  )
}
