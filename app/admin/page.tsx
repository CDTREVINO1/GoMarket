export default async function AdminPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border bg-background p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="text-2xl font-bold">20</p>
        </article>

        <article className="rounded-xl border bg-background p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Products
          </h3>
          <p className="text-2xl font-bold">20</p>
        </article>
      </div>
    </section>
  )
}
