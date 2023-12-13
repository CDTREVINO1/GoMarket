"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserSchema } from "lib/schema"
import { signIn } from "next-auth/react"
import placeholderPic from "public/placeholder.png"
import { useForm } from "react-hook-form"

import CreateUserForm from "./create-user-form"

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(UserSchema) })
  const [isLogin, setIsLogin] = useState(true)
  const [status, setStatus] = useState("")
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const onSubmit = async (data) => {
    const { username, password } = data

    try {
      const result = await signIn("credentials", {
        redirect: false,
        user: username,
        password: password,
        callbackUrl: "/",
      })

      if (!result.error) {
        router.refresh()
        router.replace("/")
      } else {
        setStatus(result.error)
      }
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div>
            <Image
              className="w-auto h-12 mx-auto"
              src={placeholderPic}
              alt="Logo"
              width={100}
              height={100}
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
              {isLogin ? "Login" : "Create an account"}
            </h2>
          </div>
          {status && <p className="text-center text-red-500">{status}</p>}

          {isLogin ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                {...register("username")}
              />
              {errors.username?.message && (
                <p className="text-red-600">{errors.username.message}</p>
              )}

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <button
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500"
                type="submit"
              >
                Login
              </button>
            </form>
          ) : (
            <CreateUserForm setStatus={setStatus} />
          )}
          <div className="flex items-center justify-center">
            <button
              className="mt-2 text-sm text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400"
              type="button"
              onClick={() => {
                switchAuthModeHandler()
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Already have an account? Login here"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
