import { notFound } from "next/navigation";
import { AddToCart } from "components/cart/add-to-cart";
import { getProduct } from "lib/pos/queries/product";
import Footer from "components/layout/footer";
import Breadcrumb from "components/layout/breadcrumbs";
import Divider from "components/layout/divider";
import ProductImage from "./productImage";

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

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row">
          <div className="mx-4 border md:mx-auto md:w-1/2">
            <ProductImage product={product} />
          </div>

          {/* Product Details */}
          <div className="mx-4 flex max-w-lg flex-col justify-between bg-gray-100 p-6 md:w-1/2">
            {/* Product Title and Brand */}
            <div>
              <h1 className="ml-2 mt-8 text-4xl font-bold tracking-tight text-gray-900 ">
                {product.name}
              </h1>

              {/* Product Price */}
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="mb-4 ml-2 mt-8 text-2xl font-thin tracking-tight text-gray-900">
                  ${product.price}
                </p>
              </div>

              <Divider />

              {/* Product Description */}
              <p className="ml-2 mt-8 text-lg text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="mt-auto">
              <AddToCart
                availableForSale={product.availability}
                productId={product._id}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
