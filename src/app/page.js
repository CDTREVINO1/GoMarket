import Footer from "components/layout/footer";
import Link from "next/link";
import products from "lib/seeds/products";
import Slider from "components/products/productSlider";
import ContactUs from "components/layout/contactUs";
import HeroSection from "components/layout/herosection";

export const metadata = {
  title: "Online Store",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow ">
        <HeroSection />
        <div className="mt-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800 dark:text-gray-300 md:text-4xl lg:text-5xl">
            Featured Products
          </h2>
          <div className="mt-4 flex flex-col md:flex-row md:flex-wrap md:justify-center md:space-x-4">
            <Slider products={products} />
          </div>
        </div>
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
