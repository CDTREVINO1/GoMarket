import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    username: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: string
  }
}
