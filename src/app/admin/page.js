import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import { getProductsByAvailability } from "lib/pos/queries/product";
import ProductsList from "components/products/products-list";
import CreateProductModal from "components/products/create-product-modal";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session?.user.role !== "admin") redirect("/auth");

  const products = await getProductsByAvailability();

  return (
    <main className=" bg-slate-300 dark:bg-gray-600">
      <CreateProductModal />
      <ProductsList products={products} />
    </main>
  );
}
