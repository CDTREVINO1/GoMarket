import Order from "@/components/orders/order"

export default function OrderList({ orders }) {
  return (
    <>
      <ul>
        {orders.map((order, index) => {
          return <Order key={index} order={order} />
        })}
      </ul>
    </>
  )
}
