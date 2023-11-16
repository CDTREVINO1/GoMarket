const mongoose = require("mongoose")
const Product = require("./product")

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    expireAt: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
      index: { expires: 7 * 24 * 60 * 60 * 1000 },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema)
