import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import ProductsList from "components/products/products-list";
import CreateProductModal from "components/products/create-product-modal";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session?.user.role !== "admin") redirect("/auth");

  return (
    <main>
      <section className="ml-3 h-screen w-screen bg-slate-300">
        <h1>Products</h1>
        <CreateProductModal />
        <ProductsList />
      </section>
    </main>
  );
}
