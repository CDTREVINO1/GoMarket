export default function AdminLayout({ children }) {
  return (
    <>
      <section className="container mx-auto max-w-7xl border px-4 py-5 sm:py-7">
        <h1 className="text-bold text-2xl">Admin Dashboard</h1>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-10">
        <main className="-mx-4 flex flex-col px-4 md:w-2/3 md:flex-row lg:w-3/4">
          <article className="mb-5 rounded border border-gray-200 p-3 lg:p-5">
            {children}
          </article>
        </main>
      </section>
    </>
  )
}
