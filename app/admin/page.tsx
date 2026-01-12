import prisma from "@/lib/prisma"

export default async function AdminPage() {
  const totalProducts = await prisma.product.count()
  const totalUsers = await prisma.user.count()

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border bg-background p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </article>

        <article className="rounded-xl border bg-background p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Products
          </h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </article>
      </div>
    </section>
  )
}
