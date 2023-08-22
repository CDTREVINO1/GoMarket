export default function OrderItem({ item }) {
  const { name, price } = item.product;
  return (
    <>
      <li>{name}</li>
      <li>{price}</li>
      <li>Quantity: {item.quantity}</li>
    </>
  );
}
