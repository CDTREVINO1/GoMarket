import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "components/cart/add-to-cart";
import { getProduct } from "lib/pos/queries/product";
import Footer from "components/layout/footer";
import Breadcrumb from "components/layout/breadcrumbs";
import Divider from "components/layout/divider";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: `${product?.name}`, url: "/products/example" },
  ];

  return (
    <>
      <Breadcrumb links={breadcrumbs} />

      <div className="m-auto max-w-3xl md:flex">
        {/* Product Image */}
        <div className="w-full ">
          <div className="p-4">
            <Image
              src={product.images[0]}
              alt="Picture of product."
              height={500}
              width={500}
              className="w-full rounded-lg object-center"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="pl-2 ">
          <div>
            <h1 className="ml-4 text-4xl tracking-tight text-gray-900">
              {product.name}
            </h1>
            <h1 className="ml-4 text-4xl tracking-tight text-gray-900">
              {product.brand}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="mb-4 ml-4 text-lg tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>
            <div className="items-center text-yellow-500">
              {Array.from({ length: product.rating }, (_, index) => (
                <svg
                  key={index}
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 1.13l1.54 4.63h4.87a.5.5 0 01.36.86l-3.92 2.84 1.5 4.5a.5.5 0 01-.76.57L10 12.83l-3.09 2.5a.5.5 0 01-.76-.57l1.5-4.5-3.92-2.84a.5.5 0 01.36-.86h4.87L10 1.13z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>

            <Divider />

            <p className="ml-4 mt-2 text-lg text-gray-600">
              {product.description}
            </p>
          </div>
          {/* Add to Cart */}
          <div className="mx-auto mb-10 mt-20 ">
            <AddToCart
              availableForSale={product.availability}
              productId={product._id}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
