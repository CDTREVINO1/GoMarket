import ProductsGrid from "../../../components/products/products-grid";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const products = await res.json();
  return products;
}

export default async function AllProductsPage() {
  const data = await getProducts();

  return (
    <>
      <ProductsGrid products={data.products} />
    </>
  );
}
