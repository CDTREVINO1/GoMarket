"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

const LogoutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.refresh()
  }

  return (
    <Button
      className="cursor-pointer text-foreground"
      variant="default"
      onClick={handleSignOut}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
