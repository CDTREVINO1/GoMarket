import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { fetchOrders } from "@/lib/pos/queries/orders"
import OrderList from "@/components/orders/order-list"
import ProfileForm from "@/components/profile/profile-form"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth")

  const orders = await fetchOrders(session?.user?.id)

  return (
    <section className="flex h-full flex-col items-center py-6">
      <ProfileForm />
      <h1 className="py-6 text-center text-2xl font-bold md:text-3xl">
        Order history
      </h1>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <h1>No Order History Yet.</h1>
      )}
    </section>
  )
}
