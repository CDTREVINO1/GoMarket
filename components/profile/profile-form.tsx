"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { ChangePasswordSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  })

  const [status, setStatus] = useState("")

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  }

  const formSubmitHandler = async (data) => {
    const { currentPassword, newPassword } = data

    try {
      const result = await changePasswordHandler({
        oldPassword: currentPassword,
        newPassword: newPassword,
      })
      setStatus(result.message)
      form.reset()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const passwordsMatchError = form.formState.errors[""]?.message

  const clearPasswordInputs = () => {
    form.reset({
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    })
  }

  return (
    <Card className="w-full scale-[85%] sm:max-w-md md:scale-100">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          {status && (
            <p className="text-center text-xs text-red-500">{status}</p>
          )}
          {form.formState.errors[""]?.message && (
            <p className="text-center text-xs text-red-600">
              {form.formState.errors[""].message}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(formSubmitHandler)}>
          <FieldGroup>
            <Controller
              name="currentPassword"
              control={form.control}
              rules={{
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-account-current-password">
                    Current Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-account-current-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Current Password"
                    autoComplete="off"
                    type="password"
                    onClick={() => {
                      passwordsMatchError && clearPasswordInputs()
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-account-password">
                    New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-account-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="New Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="passwordConfirm"
              control={form.control}
              rules={{
                validate: (value) =>
                  value === newPassword.current || "The passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-account-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-account-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Change Password</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
