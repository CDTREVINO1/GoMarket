export default function AdminUsersPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Users</h2>

      <div className="rounded-xl border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">admin@test.com</td>
              <td className="px-4 py-2">Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
