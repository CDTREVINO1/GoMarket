import OrderItem from "./order-item";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Order({ order }) {
  const { _id, orderTotal, orderItems, createdAt } = order;

  return (
    <>
      <li>
        <ul>
          <li>ORDER ID: {_id}</li>
          <li>TOTAL: ${orderTotal / 100}</li>
          <li>ORDER PLACED: {dateFormatter.format(Date.parse(createdAt))}</li>
        </ul>
      </li>
      <li>
        Products Ordered:
        <ul>
          {orderItems.map((item, index) => {
            return <OrderItem key={index} item={item} />;
          })}
        </ul>
      </li>
    </>
  );
}
