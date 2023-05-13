import Link from "next/link";

const Product = (props) => {
  const { id, title, price } = props;

  const linkPath = `/products/${id}`;

  // TODO: Include image, title, & price
  return (
    <>
      <Link href={linkPath}>
        <h1>{title}</h1>
        <h2>{price}</h2>
      </Link>
    </>
  );
};

export default Product;
