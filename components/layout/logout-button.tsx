"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <button
      className="block px-4 py-2 text-gray-900 transition duration-300 ease-in-out rounded hover:bg-gray-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
      onClick={() => signOut()}
    >
      Logout
    </button>
  )
}

export default LogoutButton
