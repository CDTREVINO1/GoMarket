import ContactUs from "@/components/layout/contactUs"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/layout/herosection"
import Slider from "@/components/products/productSlider"
import { getProductsByAvailability } from "@/lib/pos/queries/product"

export const metadata = {
  title: "Online Store",
}

export default async function Page() {
  const products = await getProductsByAvailability("available")

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <main className="flex-grow ">
        <HeroSection />
        <div className=" dark:bg-gray-600">
          <h2 className="pt-4 text-3xl font-extrabold text-center text-gray-800 dark:text-white md:text-4xl lg:text-5xl">
            Featured Products
          </h2>
          <div className="flex flex-col mt-4 md:flex-row md:flex-wrap md:justify-center md:space-x-4">
            <Slider products={products} />
          </div>
        </div>
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}
