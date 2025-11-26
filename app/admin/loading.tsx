"use client"

export default function AdminLoading() {
  return (
    <section className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </section>
  )
}
