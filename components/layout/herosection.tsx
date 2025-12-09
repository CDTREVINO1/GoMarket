import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="py-12 text-center md:py-36">
      <div className="container space-y-6 px-4">
        <h1 className="text-4xl leading-none font-extrabold md:text-6xl lg:text-7xl">
          Discover Our Latest Collection
        </h1>

        <p className="md:text-xl lg:text-2xl">
          Shop now and get amazing deals on your favorite products
        </p>

        <Button size="lg" asChild>
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
