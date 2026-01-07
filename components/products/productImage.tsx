"use client"

import { useState } from "react"
import Image from "next/image"
import placeholderPic from "@/public/placeholder.png"

type Image = {
    public_id: string
    url: string
}

type ProductData = {
    id: string
    title: string
    description: string
    price: number
    category: string
    images: Image[]
    handle: string
    createdAt: Date
    updatedAt: Date
    stripePriceId: string
    availability: boolean
}

function ProductImage({
    product,
}: {
    product?: ProductData | null
}) {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(product?.images[0].url)

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
                        {product?.images.map((image: { url: string, public_id: string }, index: number) => (
                            <div
                                key={index}
                                className="mr-2 cursor-pointer"
                                onClick={() => handleImageClick(image.url)}
                            >
                                <Image
                                    src={image.url}
                                    alt={`Thumbnail of product - ${index}`}
                                    height={100}
                                    width={100}
                                    className={`rounded-lg object-center ${selectedImage === image.url ? "border-2 border-blue-500" : ""
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
