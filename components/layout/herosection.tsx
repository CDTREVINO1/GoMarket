import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative py-12 text-center text-white bg-blue-700 dark:bg-gray-900 dark:text-white">
      <div className="container relative px-4 mx-auto">
        <h1 className="mb-4 text-5xl font-extrabold leading-none md:text-6xl lg:text-7xl">
          Discover Our Latest Collection
        </h1>

        <p className="mb-8 text-xl text-gray-300 dark:text-white md:text-2xl">
          Shop now and get amazing deals on your favorite products.
        </p>

        <Link
          href="/products"
          className="inline-block px-10 py-4 text-xl font-medium text-blue-700 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl dark:bg-blue-700 dark:text-gray-200"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
