import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserSchema } from "lib/schema"
import { useForm } from "react-hook-form"

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

export default function CreateUserForm({ setStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CreateUserSchema) })

  const onSubmit = async (data) => {
    const { username, email, password } = data

    try {
      const result = await createUser(username, password, email)

      setStatus(result.message)
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Email Address
      </label>
      <input
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        {...register("email")}
      />
      {errors.email?.message && (
        <p className="text-red-600">{errors.email.message}</p>
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

      <label
        htmlFor="confirm-password"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Confirm Password
      </label>
      <input
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-sm"
        type="password"
        id="confirm-password"
        name="confirm-password"
        autoComplete="current-password"
        {...register("confirmedPassword")}
      />
      {errors.confirmedPassword?.message && (
        <p className="text-red-600">{errors.confirmedPassword.message}</p>
      )}
      {errors[""]?.message && (
        <p className="text-red-600">{errors[""].message}</p>
      )}

      <button
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500"
        type="submit"
      >
        Create Account
      </button>
    </form>
  )
}
