import bcrypt, { compare, hash } from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from "@/lib/prisma"

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: { username: credentials.user },
        })

        if (!user) {
          throw new Error("No user found!")
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          console.log("Invalid username or password")
          throw new Error("Invalid username or password")
        }

        return { username: user.username, email: user.email }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.username
        session.user.email = token.email
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.users.findUnique({
        where: { email: token.email },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      }
    },
  },
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function comparePasswords(currentPassword, newPassword) {
  try {
    const isMatch = await bcrypt.compare(newPassword, currentPassword)
    return isMatch
  } catch (error) {
    console.log("Error comparing passwords:", error.message)
    throw new Error("Password comparison failed.")
  }
}
