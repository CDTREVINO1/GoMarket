import { notFound } from "next/navigation"

import prisma from "@/lib/prisma"
import { AddToCart } from "@/components/cart/add-to-cart"
import BreadcrumbsComponent from "@/components/layout/breadcrumbs-component"
import Divider from "@/components/layout/divider"
import ProductImage from "@/components/products/productImage"
import SuggestedProducts from "@/components/products/suggested-products"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; handle: string }>
}) {
  const { handle } = await params
  const product = await prisma.products.findFirst({
    where: {
      handle: handle,
    },
  })

  if (!product) return notFound()

  const breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: `${product?.title}`, url: "/products/example" },
  ]

  return (
    <section>
      <BreadcrumbsComponent links={breadcrumbs} />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <div className="mx-4 md:mx-auto md:w-1/2">
            <ProductImage product={product} />
          </div>

          <div className="mx-4 flex max-w-lg flex-col justify-between p-6 md:w-1/2">
            <div>
              <h1 className="mt-8 ml-2 text-4xl font-bold tracking-tight">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="mt-8 mb-4 ml-2 text-2xl font-thin tracking-tight">
                  ${product.price}
                </p>
              </div>

              <Divider />

              <p className="mt-8 ml-2 text-lg">{product.description}</p>
            </div>

            <div className="mt-6">
              <AddToCart
                availableForSale={product.availability}
                productId={product.id}
              />
            </div>
          </div>
        </div>
      </div>

      <SuggestedProducts />
    </section>
  )
}
