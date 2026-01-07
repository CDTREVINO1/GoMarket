import Link from "next/link"
import type { Prisma } from "@/generated/prisma/client"

type OrderWithItems = Prisma.OrderGetPayload<{
    include: {
        orderItems: {
            include: {
                product: true
            }
        },
    }
}>

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
})

export default function Order({ order }: { order: OrderWithItems }) {
    const { id, orderTotal, orderItems, createdAt } = order

    return (
        <div className="m-10 mx-auto max-w-4xl rounded-xl border bg-white shadow-md dark:bg-gray-800">
            <div className="border-b p-4 pb-4 md:pb-4">
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className="mr-2 flex font-bold">Order Number:</span>
                        {id}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className="mr-2 flex font-bold">Date placed:</span>
                        {dateFormatter.format(createdAt)}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className="mr-2 flex font-bold">Total amount:</span>$
                        {orderTotal / 100}
                    </p>
                </div>
            </div>

            <ul className="mt-2">
                {orderItems.map((item, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-start border-b p-4 sm:flex-row"
                    >
                        <div className="mx-auto shrink-0 overflow-hidden sm:mx-0 sm:h-32 sm:w-32">
                            <img
                                src={item.product.images[0].url}
                                alt={item.product.title}
                                height="200"
                                width="200"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="mt-4 w-full flex-1 text-sm sm:mt-0 sm:ml-6 sm:flex sm:items-center sm:justify-between">
                            <div className="flex w-full flex-col text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                                <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {item.product.title}
                                    </h5>
                                    <p className="mt-2 text-gray-500 dark:text-gray-300">
                                        {item.product.description}
                                    </p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <p className="font-light text-gray-900 sm:text-sm dark:text-gray-100">
                                        ${item.product.price}
                                    </p>

                                    <Link
                                        href={`/product/${item.product.handle}`}
                                        className="text-indigo-600 hover:text-indigo-500"
                                    >
                                        View product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
