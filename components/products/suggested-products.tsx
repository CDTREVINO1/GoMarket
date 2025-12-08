import Image from "next/image"
import Link from "next/link"

import prisma from "@/lib/prisma"

const SuggestedProducts = async () => {
  const products = await prisma.products.findMany({
    where: {
      availability: true,
    },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product, index) => {
          const linkPath = `/product/${product.handle}`

          return (
            <Link key={index} href={linkPath}>
              <div
                key={index}
                className="group relative border border-black p-2"
              >
                <div className="mx-2 rounded-lg">
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
                </div>
                <div className="mt-4 flex items-center justify-between space-x-8 pb-2 text-base font-medium">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SuggestedProducts
