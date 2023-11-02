"use client";
import { useState } from "react";
import Image from "next/image";

function ProductImage({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0].url);

  const handleImageClick = (image) => {
    setSelectedImage(image.url);
  };

  return (
    <div className="max-w-3xl p-2 m-auto md:flex">
      <div className="w-full">
        <div className="">
          {/* Main Image */}
          <div className="mb-4">
            <Image
              src={selectedImage}
              alt={`Picture of product`}
              height={500}
              width={500}
              className="object-center w-full rounded-lg"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex ">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="mr-2 cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail of product - ${index}`}
                  height={100}
                  width={100}
                  className={`rounded-lg object-center ${
                    selectedImage === image ? "border-2 border-blue-500" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImage;
