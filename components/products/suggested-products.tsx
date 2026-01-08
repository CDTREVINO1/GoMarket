"use client"

import Image from "next/image"
import Link from "next/link"
import { Prisma } from "@/generated/prisma/browser"
import placeholderPic from "@/public/placeholder.png"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Product = Prisma.ProductModel

type Image = {
  public_id: string
  url: string
}

const SuggestedProducts = ({ products }: { products: Product[] }) => {
  return (
    <Carousel
      className="min-h-fit w-full max-w-3/4 p-4 md:max-w-10/12"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {products.map((product, index) => {
          const linkPath = `/products/${product.handle}`

          return (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <div className="h-full p-1">
                <Link href={linkPath}>
                  <Card className="h-full">
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                      <Image
                        src={product?.images?.[0]?.url ?? placeholderPic}
                        alt={product.title}
                        className="h-48 w-full rounded-lg object-cover"
                        width={250}
                        height={250}
                      />
                      <div
                        className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <div className="w-full rounded-md px-4 py-2 text-center text-sm font-medium backdrop-blur backdrop-filter">
                          View Product
                        </div>
                      </div>

                      <div className="flex items-center justify-between space-x-8 pb-2 text-sm font-medium">
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default SuggestedProducts
