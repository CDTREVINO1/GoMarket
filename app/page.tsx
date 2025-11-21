import { getProductsByAvailability } from "@/lib/pos/queries/product"
import ContactUs from "@/components/layout/contactUs"
import HeroSection from "@/components/layout/herosection"
import Slider from "@/components/products/productSlider"

export const metadata = {
  title: "GoMarket",
}

export default async function Page() {
  const products = await getProductsByAvailability("available")

  return (
    <main>
      <HeroSection />
      <h2 className="pt-4 text-center text-3xl font-extrabold md:text-4xl lg:text-5xl">
        Featured Products
      </h2>
      <Slider products={products} />
      <ContactUs />
    </main>
  )
}
