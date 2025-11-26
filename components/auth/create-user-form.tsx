import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { CreateUserSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

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
  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const formSubmitHandler = async (data) => {
    const { username, email, password } = data

    try {
      const result = await createUser(username, password, email)

      setStatus(result.message)
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <form
      id="form-create-account"
      onSubmit={form.handleSubmit(formSubmitHandler)}
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-account-username">
                Username
              </FieldLabel>
              <Input
                {...field}
                id="form-create-account-username"
                aria-invalid={fieldState.invalid}
                placeholder="Username"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-account-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-create-account-email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-account-password">
                Password
              </FieldLabel>
              <Input
                {...field}
                id="form-create-account-password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="passwordConfirm"
          control={form.control}
          rules={{
            validate: (value) =>
              value === password.current || "The passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-account-confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="form-create-account-confirm-password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm Password"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className="cursor-pointer" type="submit">
          Create Account
        </Button>
      </FieldGroup>
    </form>
  )
}
