import bcrypt, { compare, hash } from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
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
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.name = token.username as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      const dbUser = await prisma.users.findUnique({
        where: { email: token.email as string },
      })

      if (!dbUser) {
        return token
      }

      return {
        ...token,
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        role: dbUser.role,
      }
    },
  },
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function comparePasswords(
  currentPassword: string,
  newPassword: string
) {
  try {
    const isMatch = await bcrypt.compare(newPassword, currentPassword)
    return isMatch
  } catch (error) {
    console.log("Error comparing passwords:", error.message)
    throw new Error("Password comparison failed.")
  }
}
