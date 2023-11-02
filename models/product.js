const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
      required: true,
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
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
