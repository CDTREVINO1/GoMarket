import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with CTA */}
      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Main Headline */}
          <div className="space-y-4">
            <Skeleton className="mx-auto h-16 w-3/4" />
            <Skeleton className="mx-auto h-16 w-2/3" />
          </div>

          {/* Subheadline */}
          <div className="mt-6 space-y-3">
            <Skeleton className="mx-auto h-6 w-5/6" />
            <Skeleton className="mx-auto h-6 w-4/5" />
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-32" />
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 border-t pt-8">
            <Skeleton className="mx-auto mb-6 h-4 w-48" />
            <div className="flex items-center justify-center gap-8">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-lg border p-6">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
