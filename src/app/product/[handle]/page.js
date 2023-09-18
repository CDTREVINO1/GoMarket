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
      <main>
        <Breadcrumb links={breadcrumbs} />
        <div className="px-6 pt-4 lg:px-8">
          <div className="mx-auto max-w-3xl ">
            <section>
              <div className="container ">
                <div className="mx-auto ">
                  {/* Product Info */}
                  <div className="mt-10 lg:mt-2">
                    <Image
                      src={product.images[0]}
                      alt="Picture of product."
                      height={100}
                      width={200}
                      className="mx-auto w-full max-w-lg rounded-lg object-center "
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="mt-20 text-3xl font-bold tracking-tight text-gray-900 ">
                      {product.name}
                    </h1>
                    <div className="mt-3">
                      <h2 className="sr-only">Product information</h2>
                      <p className="mb-4 text-3xl tracking-tight text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                    <div className="flex items-center text-yellow-500">
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
                    <p className="mt-2 text-lg text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  {/* Product Info Ends */}
                  <AddToCart
                    availableForSale={product.availability}
                    productId={product._id}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
