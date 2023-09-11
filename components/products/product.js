import Link from "next/link";
import Image from "next/image";
import placeholderPic from "public/placeholder.png";

const Product = (props) => {
  const { handle, name, price, images } = props;

  const linkPath = `/product/${handle}`;

  return (
    <>
      <div className="group m-2 flex max-w-lg flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <Link href={linkPath}>
          <Image
            className="rounded-t-lg p-8"
            src={images[0] || placeholderPic}
            alt="product image"
            height={300}
            width={300}
          />
          <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
            <h3>{name}</h3>
            <h1>${price}</h1>
          </blockquote>
        </Link>
      </div>
    </>
  );
};

export default Product;
