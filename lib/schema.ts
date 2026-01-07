import { z } from "zod"

export const ProductSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(1, "Title must be at least one character long."),
  description: z.string().trim(),
  price: z
    .number("Price is required.")
    .nonnegative("Price must be greater than or equal to 0."),
  category: z.string().trim().min(1, "Please select a category."),
})

export const CreateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username must be at least one character long.")
      .max(50, "Username cannot exceed 50 characters."),
    email: z.email(),
    password: z
      .string()
      .min(6, "Password must contain at least 6 character(s)"),
    passwordConfirm: z
      .string()
      .min(6, "Password must contain at least 6 character(s)"),
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
    currentPassword: z.string().min(1, "Please enter your current password."),
    newPassword: z
      .string()
      .min(6, "Password must contain at least 6 character(s)"),
    passwordConfirm: z.string().min(6, {
      message: "Password must contain at least 6 character(s) and must match.",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })

export const UserSchema = z.object({
  username: z.string("Username is required.").min(1, "Username is required."),
  password: z
    .string("Please enter a valid password.")
    .min(1, "Password is required."),
})
