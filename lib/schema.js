import { z } from "zod"

export const ProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim(),
  description: z.string().trim(),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    })
    .nonnegative({ message: "Price must be greater than or equal to 0." }),
  category: z.string().trim(),
})
