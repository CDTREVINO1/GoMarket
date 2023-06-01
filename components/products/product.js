import Link from "next/link";
import Image from "next/image";

const Product = (props) => {
  const { id, title, price, images } = props;

  const linkPath = `/products/${id}`;

  return (
    <>
      <Link
        href={linkPath}
        className="group flex flex-col items-center justify-center border-b border-l border-r border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
      >
        <Image
          className="rounded-t-lg p-8"
          src={images[0]}
          alt="product image"
          height={300}
          width={300}
        />
        <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
          <h3>{title}</h3>
          <h1>${price}</h1>
        </blockquote>
        {/* <button
          href="cart"
          className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to cart
        </button> */}
      </Link>
    </>
  );
};

export default Product;
