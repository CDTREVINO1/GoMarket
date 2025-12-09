import Image from "next/image"
import Link from "next/link"

import prisma from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"

const SuggestedProducts = async () => {
  const products = await prisma.products.findMany({
    where: {
      availability: true,
    },
  })

  return (
    <div className="min-h-fit p-6">
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-lg font-medium">Customers also viewed</h2>
        <Link
          href="/products"
          className="text-sm font-medium whitespace-nowrap"
        >
          View all
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product, index) => {
          const linkPath = `/product/${product.handle}`

          return (
            <Link key={index} href={linkPath}>
              <Card className="h-full">
                <CardContent>
                  <Image
                    src={product.images[0]}
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
          )
        })}
      </div>
    </div>
  )
}

export default SuggestedProducts
