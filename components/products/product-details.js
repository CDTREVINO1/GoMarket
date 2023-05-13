import Image from "next/image";

// TODO: Include title, price, image(s), add to cart, & product info.
const ProductDetails = (props) => {
  const { title, price, description, rating, images } = props;

  return (
    <>
      <h1>{title}</h1>
      <h2>{price}</h2>
      <h3>{description}</h3>
      <h3>{rating}</h3>
      <Image
        src={images[0]}
        alt="Picture of product."
        width={250}
        height={250}
      />
    </>
  );
};

export default ProductDetails;
