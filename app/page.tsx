import type { Metadata } from "next"

import prisma from "@/lib/prisma"
import HeroSection from "@/components/layout/herosection"
import Slider from "@/components/products/productSlider"

export const metadata: Metadata = {
  title: "GoMarket",
}

export default async function Page() {
  const products = await prisma.products.findMany({
    where: {
      availability: true,
    },
  })

  return (
    <main>
      <HeroSection />
      <h2 className="pt-4 text-center text-xl font-extrabold md:text-2xl lg:text-3xl">
        Featured Products
      </h2>
      <Slider products={products} />
    </main>
  )
}
