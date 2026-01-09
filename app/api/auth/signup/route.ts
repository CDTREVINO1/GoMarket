import { hashPassword } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const username: string = data.username
    const password: string = data.password
    const email: string = data.email

    const hashedPassword: string = await hashPassword(password)

    let user = await prisma.user.findMany({
      where: { OR: [{ username: username }, { email: email }] },
    })

    if (user.length >= 1) {
      return new Response(
        JSON.stringify({ message: "Email or username already exists." }),
        { status: 409 }
      )
    } else {
      const newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          role: "USER",
        },
      })

      return new Response(JSON.stringify({ message: "User created." }), {
        status: 201,
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), { status: 422 })
  }
}
