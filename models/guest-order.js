const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestOrderSchema = new Schema(
  {
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
    orderItems: [
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
    shippingAddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.GuestOrder || mongoose.model("GuestOrder", guestOrderSchema);
