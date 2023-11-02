"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import placeholderPic from "public/placeholder.png";

const Slider = ({ products }) => {
  const slideWidth = 400;
  const [offset, setOffset] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const moveNext = useCallback(() => {
    if (offset >= (products.length - 1) * slideWidth) {
      setOffset(0);
    } else {
      setOffset((prevOffset) => prevOffset + 10);
    }
  }, [offset, products.length]);

  const jumpNext = () => {
    setAutoSlide(false);
    if (offset >= (products.length - 1) * slideWidth) {
      setOffset(0);
    } else {
      setOffset((prevOffset) => prevOffset + slideWidth);
    }
    setTimeout(() => setAutoSlide(true), 3000);
  };

  const jumpPrevious = () => {
    setAutoSlide(false);
    if (offset <= 0) {
      setOffset((products.length - 1) * slideWidth);
    } else {
      setOffset((prevOffset) => prevOffset - slideWidth);
    }
    setTimeout(() => setAutoSlide(true), 3000);
  };

  useEffect(() => {
    if (autoSlide) {
      const intervalId = setInterval(moveNext, 100);
      return () => clearInterval(intervalId);
    }
  }, [offset, autoSlide, moveNext]);

  return (
    <div
      className="relative w-full mb-6 overflow-hidden"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <div
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.1s linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...products, ...products].map((product, index) => {
          const linkPath = `/product/${product.handle}`;

          return (
            <div
              key={index}
              className="inline-block h-auto p-4 w-80 "
              style={{ flexShrink: 0 }}
            >
              <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-gray-300 rounded-xl dark:border-gray-700 dark:bg-gray-800">
                <Image
                  height={200}
                  width={200}
                  src={product.images[0].url || placeholderPic}
                  alt={product.name}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
                <blockquote className="max-w-2xl mx-auto mb-4 text-black dark:text-gray-400">
                  <h3>{product.name}</h3>
                </blockquote>
                <Link
                  href={linkPath}
                  className="px-5 py-2 text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg shadow-md hover:scale-105 hover:bg-blue-700 hover:shadow-lg active:scale-100 active:bg-blue-800"
                >
                  View Product
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={jumpPrevious}
        className="absolute p-2 text-white bg-blue-600 rounded-full left-2 top-1/2"
      >
        ←
      </button>
      <button
        onClick={jumpNext}
        className="absolute p-2 text-white bg-blue-600 rounded-full right-2 top-1/2"
      >
        →
      </button>
    </div>
  );
};

export default Slider;
