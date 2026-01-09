"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { Controller, useForm } from "react-hook-form"

import { UserSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import CreateUserForm from "./create-user-form"

export default function AuthForm() {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const [isLogin, setIsLogin] = useState(true)
  const [status, setStatus] = useState("")
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
    form.reset()
  }

  const formSubmitHandler = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        user: username,
        password: password,
        callbackUrl: "/",
      })

      if (!result) {
        setStatus("An unexpected error occurred")
        return
      }

      if (result.error) {
        setStatus(result.error)
        return
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        setStatus(error.message)
      } else {
        setStatus("An unexpected error occurred")
      }
      console.error("Sign in error:", error)
    }
  }

  return (
    <Card className="w-full scale-[85%] sm:max-w-md md:scale-100">
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Create an account"}</CardTitle>
        {status && <p className="text-center text-red-500">{status}</p>}
      </CardHeader>

      <CardContent>
        {isLogin ? (
          <form id="form-login" onSubmit={form.handleSubmit(formSubmitHandler)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-login-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Username"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-login-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Password"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                className="cursor-pointer"
                disabled={form.formState.isLoading}
                type="submit"
              >
                Login
              </Button>
            </FieldGroup>
          </form>
        ) : (
          <CreateUserForm setStatus={setStatus} />
        )}

        <div className="flex items-center justify-center">
          <Button
            variant="link"
            onClick={() => {
              switchAuthModeHandler()
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up here"
              : "Already have an account? Login here"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
