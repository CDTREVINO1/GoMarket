import Footer from "components/layout/footer";
import Link from "next/link";
import products from "lib/seeds/products";
import Slider from "components/products/productSlider";

export const metadata = {
  title: "Online Store",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow ">
        <div className="relative bg-blue-700 py-12 text-center text-white">
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(37, 99, 235, 1) 0%, rgba(81, 58, 237, 1) 100%)",
              zIndex: -1,
            }}></div>

          <div className="container relative z-10 mx-auto">
            <h1 className="mb-4 text-5xl font-extrabold leading-none md:text-6xl lg:text-7xl">
              Discover Our Latest Collection
            </h1>
            <p className="mb-8 text-xl text-gray-300 md:text-2xl">
              Shop now and get amazing deals on your favorite products.
            </p>
            <Link
              href="/shop"
              className="inline-block transform rounded-lg bg-white px-10 py-4 text-xl font-medium text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Shop Now
            </Link>
          </div>
        </div>

        <div className="container mx-auto mt-4 py-12 ">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-800 md:text-4xl lg:text-5xl">
            Featured Products
          </h2>

          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:space-x-4">
            <Slider products={products} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
