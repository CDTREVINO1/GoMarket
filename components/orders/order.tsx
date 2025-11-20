import Link from "next/link"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export default function Order({ order }) {
  const { _id, orderTotal, orderItems, createdAt } = order

  return (
    <div className="max-w-4xl m-10 mx-auto bg-white border shadow-md rounded-xl dark:bg-gray-800">
      <div className="p-4 pb-4 border-b md:pb-4">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            <span className="flex mr-2 font-bold ">Order Number:</span>
            {_id}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            <span className="flex mr-2 font-bold ">Date placed:</span>
            {dateFormatter.format(Date.parse(createdAt))}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            <span className="flex mr-2 font-bold">Total amount:</span>$
            {orderTotal / 100}
          </p>
        </div>
      </div>

      <ul className="mt-2 ">
        {orderItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-start p-4 border-b sm:flex-row"
          >
            <div className="flex-shrink-0 mx-auto overflow-hidden sm:mx-0 sm:h-32 sm:w-32">
              <img
                src={item.product.images[0].url}
                alt={item.product.name}
                height="200"
                width="200"
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 w-full mt-4 text-sm sm:ml-6 sm:mt-0 sm:flex sm:items-center sm:justify-between">
              <div className="flex flex-col w-full text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.product.name}
                  </h5>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <p className="font-light text-gray-900 dark:text-gray-100 sm:text-sm">
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
