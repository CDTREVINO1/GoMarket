"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import placeholderPic from "public/placeholder.png"

const createUser = async (username, password, email) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!")
  }

  return data
}

function AuthForm() {
  const emailInputRef = useRef()
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmedPasswordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true)
  const [status, setStatus] = useState("")
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const clearLoginRefs = () => {
    usernameInputRef.current.value = ""
    passwordInputRef.current.value = ""
  }

  const clearCreateAccountRefs = () => {
    usernameInputRef.current.value = ""
    emailInputRef.current.value = ""
    passwordInputRef.current.value = ""
    confirmedPasswordInputRef.current.value = ""
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const enteredUsername = usernameInputRef.current?.value
    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef?.current.value
    const confirmedPassword = confirmedPasswordInputRef.current?.value

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        user: enteredUsername,
        password: enteredPassword,
        callbackUrl: "/",
      })

      if (!result.error) {
        router.refresh()
        router.replace("/")
      }
      setStatus(result.error)
    } else {
      if (enteredPassword.trim() !== confirmedPassword.trim()) {
        setStatus("New password and confirm password do not match.")
        return
      }

      try {
        const result = await createUser(
          enteredUsername,
          enteredPassword,
          enteredEmail
        )

        clearCreateAccountRefs()
        switchAuthModeHandler()
        setStatus(result.message)
      } catch (error) {
        setStatus(error.message)
      }
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
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            {status && <p className="text-center text-red-500">{status}</p>}
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                ref={usernameInputRef}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                onClick={() => setStatus("")}
              />
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailInputRef}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                  onClick={() => setStatus("")}
                />
              </div>
            )}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                ref={passwordInputRef}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                onClick={() => setStatus("")}
              />
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={confirmedPasswordInputRef}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
                  onClick={() => setStatus("")}
                />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  switchAuthModeHandler()
                  isLogin ? clearLoginRefs() : clearCreateAccountRefs()
                }}
                className="mt-2 text-sm text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400"
              >
                {isLogin
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Login here"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthForm
