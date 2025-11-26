"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Admin error:", error)
  }, [error])

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred while loading the admin panel.
      </p>

      <div className="flex gap-2">
        <Button onClick={() => reset()}>Try Again</Button>

        <Button variant="outline" onClick={() => location.reload()}>
          Reload Page
        </Button>
      </div>
    </section>
  )
}
