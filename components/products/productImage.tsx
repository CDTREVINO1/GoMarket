"use client"

import { useState } from "react"
import Image from "next/image"
import placeholderPic from "@/public/placeholder.png"

function ProductImage({
  product,
}: {
  product: {
    title: string
    description: string
    price: number
    category: string
    id: string
    images: string[]
    handle: string
    createdAt: Date
    updatedAt: Date
    stripePriceId: string | null
    availability: boolean
  }
}) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className="m-auto max-w-3xl p-2 md:flex">
      <div className="w-full">
        <div className="">
          {/* Main Image */}
          <div className="mb-4">
            <Image
              src={selectedImage || placeholderPic}
              alt={`Picture of product`}
              height={500}
              width={500}
              className="w-full rounded-lg object-center"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className="mr-2 cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
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
  )
}

export default ProductImage
