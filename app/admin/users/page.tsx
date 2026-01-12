import { Suspense } from "react"
import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUsers } from "@/components/users/user-actions"
import UsersTable from "@/components/users/users-table"

export const metadata: Metadata = {
  title: "User Management | GoMarket Admin",
  description: "Manage users and their roles",
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
  const { page, query } = await searchParams
  const currentPage = Number(page) || 1

  const result = await getUsers(currentPage, 10)

  if (!result.success) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{result.error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { users, pagination } = result.data

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <p className="mt-2 text-muted-foreground">
        Manage user accounts and permissions
      </p>

      <div className="rounded-xl border bg-background">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>{pagination.total} total users</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <UsersTable
                users={users}
                pagination={pagination}
                currentPage={currentPage}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
