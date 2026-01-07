import Order from "@/components/orders/order"
import { Prisma } from "@/generated/prisma/client"
type OrderWithItems = Prisma.OrderGetPayload<{
    include: {
        orderItems: {
            include: {
                product: true
            }
        },
        user: true
    }
}>

export default function OrderList({ orders }: { orders: OrderWithItems[] }) {
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
