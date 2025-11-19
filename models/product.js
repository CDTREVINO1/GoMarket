const mongoose = require("mongoose")
const categories = require("@/lib/categories")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    stripePriceId: {
      type: String,
      default: "",
    },
    availability: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: {
        values: categories,
        message: "Please select a product category.",
      },
      default: "Other",
    },
    images: {
      type: [
        {
          public_id: String,
          url: String,
        },
      ],
      default: [],
    },
    handle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema)
