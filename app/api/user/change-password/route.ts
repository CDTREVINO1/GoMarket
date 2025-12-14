import { getServerSession } from "next-auth/next"

import {
  authOptions,
  comparePasswords,
  hashPassword,
  verifyPassword,
} from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const data = await request.json()

    if (!session)
      return new Response(JSON.stringify({ message: "Not authenticated!" }), {
        status: 401,
      })

    const userId = session?.user?.id
    const { oldPassword, newPassword } = data

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user)
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
      })

    const currentPassword = user.password

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual)
      return new Response(JSON.stringify({ message: "Invalid password." }), {
        status: 403,
      })

    if (!newPassword || newPassword.trim().length < 7)
      return new Response(
        JSON.stringify({
          message:
            "Invalid input - new password should also be at least 7 characters long.",
        }),
        { status: 422 }
      )

    const passwordsMatch = await comparePasswords(currentPassword, newPassword)

    if (passwordsMatch) {
      return new Response(
        JSON.stringify({
          message: "New password must be different from current password.",
        }),
        { status: 422 }
      )
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return new Response(
      JSON.stringify({ message: "Password updated successfully." }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), { status: 422 })
  }
}
