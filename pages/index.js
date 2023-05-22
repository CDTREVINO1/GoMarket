import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Product from "../components/products/product";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Store</title>
        <meta name="description" content="Online Store"></meta>
      </Head>
      <main className="w-full">
        <section className="bg-center bg-no-repeat bg-gradient-to-r from-[#90e0ef] to-[#0077b6] ... bg-gray-700 bg-blend-multiply">
          <div className="max-w-screen-xl px-4 py-24 mx-auto text-center lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              We invest in the world’s potential
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-white rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
