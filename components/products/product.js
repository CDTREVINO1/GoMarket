"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import placeholderPic from "public/placeholder.png";

const Product = (props) => {
  const { handle, name, price, images } = props;

  const linkPath = `/product/${handle}`;

  return (
    <Link
      href={linkPath}
      className="m-2 flex h-[400px] flex-col items-center justify-center border  border-gray-300 bg-white p-8 text-center hover:underline dark:border-gray-700 dark:bg-gray-800">
      <motion.div
        whileHover={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}>
        <Image
          className="p-8 rounded-t-lg"
          src={images?.[0].url || placeholderPic}
          alt="product image"
          height={300}
          width={300}
        />
        <blockquote className="max-w-2xl mx-auto mb-4 text-black dark:text-gray-400 lg:mb-8">
          <h3 className="text-xl">{name}</h3>
          <h1>${price}</h1>
        </blockquote>
      </motion.div>
    </Link>
  );
};

export default Product;
