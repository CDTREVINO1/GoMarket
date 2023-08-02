import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "../../../../components/cart/add-to-cart";
import { getProduct } from "/lib/pos/queries/product";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <>
      <section className="body-font overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <Image
              src={product.images[0]}
              alt="Picture of product."
              width={250}
              height={250}
              className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {product.name}
              </h1>

              <h3>⭐️{product.rating}</h3>
              <div className="mb-4 flex"></div>
              <p className="leading-relaxed">{product.description}</p>

              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  ${product.price}
                </span>
                <AddToCart
                  availableForSale={product.availability}
                  productId={product._id}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
