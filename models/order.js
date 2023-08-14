const mongoose = require("mongoose");
const Product = require("./product");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripeCheckoutId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    orderItems: [
      {
        productDescription: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
