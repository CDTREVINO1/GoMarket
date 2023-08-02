import ProductsGrid from "components/products/products-grid";
import { getProducts } from "lib/pos/queries/product";

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <>
      <ProductsGrid products={products} />
    </>
  );
}
