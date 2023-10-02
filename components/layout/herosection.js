import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative border-b bg-blue-700 py-12 text-center text-white dark:bg-gray-900 dark:text-gray-300">
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-gray-900 dark:to-black"></div>

      <div className="container relative mx-auto px-4">
        <h1 className="flowing-gradient mb-4 bg-gradient-to-r from-pink-500 to-yellow-500  bg-clip-text text-5xl font-extrabold leading-none text-transparent md:text-6xl lg:text-7xl">
          Discover Our Latest Collection
        </h1>

        <p className="mb-8 text-xl text-gray-300 dark:text-gray-400 md:text-2xl">
          Shop now and get amazing deals on your favorite products.
        </p>

        <Link
          href="/products"
          className="inline-block transform rounded-lg bg-white px-10 py-4 text-xl font-medium text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-blue-700 dark:text-gray-200">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
