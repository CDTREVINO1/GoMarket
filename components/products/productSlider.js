"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Slider = ({ products }) => {
  const slideWidth = 400;
  const [offset, setOffset] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const moveNext = () => {
    if (offset >= (products.length - 1) * slideWidth) {
      setOffset(0);
    } else {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

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
  }, [offset, autoSlide]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}>
      <div
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.1s linear",
        }}
        className="flex whitespace-nowrap">
        {[...products, ...products].map((product, index) => (
          <div
            key={index}
            className="inline-block h-auto w-80 p-4"
            style={{ flexShrink: 0 }}>
            <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <Image
                height={200}
                width={200}
                src={product.images?.[0]}
                alt={product.name}
                className="h-48 w-full rounded-t-lg object-cover"
              />
              <blockquote className="mx-auto mb-4 max-w-2xl text-black dark:text-gray-400">
                <h3>{product.name}</h3>
              </blockquote>
              <Link
                href={`/product/${product.handle}`}
                className="transform rounded-lg bg-blue-600 px-5 py-2 text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-lg active:scale-100 active:bg-blue-800">
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={jumpPrevious}
        className="absolute left-2 top-1/2 rounded-full bg-blue-600 p-2 text-white">
        ←
      </button>
      <button
        onClick={jumpNext}
        className="absolute right-2 top-1/2 rounded-full bg-blue-600 p-2 text-white">
        →
      </button>
    </div>
  );
};

export default Slider;
