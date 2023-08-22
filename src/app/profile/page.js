import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "components/profile/profile-form";
import OrderList from "components/orders/order-list";
import { fetchOrders } from "lib/pos/queries/orders";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth");

  const orders = await fetchOrders(session.user.id);

  return (
    <main>
      <section className="h-screen w-screen bg-slate-300">
        <ProfileForm />
        {orders ? (
          <OrderList orders={orders} />
        ) : (
          <h1>No Order History Yet.</h1>
        )}
      </section>
    </main>
  );
}
