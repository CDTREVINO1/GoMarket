import dbConnect from "lib/dbConnect";
import Order from "models/order";

export const fetchOrders = async (userId) => {
  await dbConnect();

  const orderData = await Order.find({ user: userId })
    .lean()
    .populate("orderItems.product");
  const orders = JSON.stringify(orderData);

  return JSON.parse(orders);
};
