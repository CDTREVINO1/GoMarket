import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative py-12 text-center">
      <div className="relative container mx-auto px-4">
        <h1 className="mb-4 text-5xl leading-none font-extrabold md:text-6xl lg:text-7xl">
          Discover Our Latest Collection
        </h1>

        <p className="mb-8 text-xl md:text-2xl">
          Shop now and get amazing deals on your favorite products.
        </p>

        <Link
          href="/products"
          className="inline-block transform rounded-lg px-10 py-4 text-xl font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
