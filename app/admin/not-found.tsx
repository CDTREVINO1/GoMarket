import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function AdminNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-3xl font-bold">Admin Page Not Found</h2>

      <p className="max-w-md text-muted-foreground">
        The admin page you are looking for does not exist or was moved.
      </p>

      <Button asChild>
        <Link href="/admin">Back to Dashboard</Link>
      </Button>
    </section>
  )
}
