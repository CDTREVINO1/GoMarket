import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="py-12 text-center">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-2xl leading-none font-extrabold md:text-4xl lg:text-5xl">
          Discover Our Latest Collection
        </h1>

        <p className="mb-8 text-sm md:text-xl">
          Shop now and get amazing deals on your favorite products
        </p>

        <Button size="lg" asChild>
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
