import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "components/profile/profile-form";
import OrderList from "components/orders/order-list";
import { fetchOrders } from "lib/pos/queries/orders";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth");

  const orders = await fetchOrders(session?.user.id);

  return (
    <>
      <section className="w-screen bg-white dark:bg-gray-600">
        <ProfileForm />
        <div className="h-screen pb-8 bg-gray-50 dark:bg-gray-600">
          <h1 className="pt-10 pb-8 text-2xl font-bold text-center text-gray-900 dark:text-white md:text-3xl">
            Order history
          </h1>
          {orders.length > 0 ? (
            <OrderList orders={orders} />
          ) : (
            <h1 className="text-gray-900 dark:text-white">
              No Order History Yet.
            </h1>
          )}
        </div>
      </section>
    </>
  );
}
