import OrderItem from "./order-item";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Order({ order }) {
  const { _id, orderTotal, orderItems, createdAt } = order;

  return (
    <div className="mb-4 border p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">ORDER ID: {_id}</h2>
        <p className="text-gray-600">
          ORDER PLACED: {dateFormatter.format(Date.parse(createdAt))}
        </p>
      </div>
      <p className="mb-2 text-xl font-bold">TOTAL: ${orderTotal / 100}</p>
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Products Ordered:</h3>
        <ul className="list-disc pl-5">
          {orderItems.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
