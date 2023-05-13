// TODO: Include title, price, image(s), add to cart, & product info.
const ProductDetails = (props) => {
  const { title, price, description, rating } = props;

  return (
    <>
      <h1>{title}</h1>
      <h2>{price}</h2>
      <h3>{description}</h3>
      <h3>{rating}</h3>
    </>
  );
};

export default ProductDetails;
