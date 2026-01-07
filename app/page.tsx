import type { Metadata } from "next"

import prisma from "@/lib/prisma"
import HeroSection from "@/components/layout/herosection"
import Slider from "@/components/products/productSlider"

export const metadata: Metadata = {
    title: "GoMarket",
}

export default async function Page() {
    const products = await prisma.product.findMany({
        where: {
            availability: true,
        },
    })

    return (
        <main className="flex flex-1 flex-col justify-between">
            <div className="flex justify-center">
                <HeroSection />
            </div>

            {products.length > 0 && (
                <div>
                    <h2 className="pt-4 text-center text-xl font-extrabold md:text-2xl lg:text-3xl">
                        Featured Products
                    </h2>
                    <Slider products={products} />
                </div>
            )}
        </main>
    )
}
