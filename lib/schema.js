import { z } from "zod"

export const ProductSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .min(1, { message: "Title must be at least one character long." }),
  description: z.string().trim(),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    })
    .nonnegative({ message: "Price must be greater than or equal to 0." }),
  category: z.string().trim().min(1, { message: "Please select a category." }),
})

export const CreateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username must be at least one character long." })
      .max(50, { message: "Username cannot exceed 50 characters." }),
    email: z.email(),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 character(s)" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must contain at least 6 character(s)" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["password"],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  })

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Please enter your current password." }),
    newPassword: z
      .string()
      .min(6, { message: "Password must contain at least 6 character(s)" }),
    passwordConfirm: z.string().min(6, {
      message: "Password must contain at least 6 character(s) and must match.",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords do not match",
  })

export const UserSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .min(1, { message: "Username is required." }),
  password: z
    .string({ required_error: "Please enter a valid password." })
    .min(1, { message: "Password is required." }),
})
