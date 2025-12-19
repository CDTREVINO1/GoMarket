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

      credentials: {
        user: {
          label: "user",
          type: "user",
          placeholder: "username123",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.user || !credentials?.password) {
          throw new Error("Missing username or password")
        }

        const user = await prisma.user.findUnique({
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

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
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

      const dbUser = await prisma.user.findUnique({
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
    if (error instanceof Error) {
      console.error("Error comparing passwords:", error.message)
    } else {
      console.error("Error comparing passwords:", error)
    }

    throw new Error("Password comparison failed.")
  }
}
