import dbConnect from "@/lib/dbConnect"
import Order from "@/models/order"

export const fetchOrders = async (userId) => {
  try {
    await dbConnect()

    const orderData = await Order.find({ user: userId })
      .lean()
      .populate("orderItems.product")
    const orders = JSON.stringify(orderData)

    return JSON.parse(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
}
