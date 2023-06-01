import Image from "next/image";

const ProductDetails = (props) => {
  const { title, price, description, rating, images } = props;

  return (
    <>
      <section className="body-font overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <Image
              src={images[0]}
              alt="Picture of product."
              width={250}
              height={250}
              className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {title}
              </h1>

              <h3>⭐️{rating}</h3>
              <div className="mb-4 flex"></div>
              <p className="leading-relaxed">{description}</p>
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                <div className="ml-6 flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  ${price}
                </span>
                <button className="ml-auto flex rounded border-0 bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none">
                  Add to Cart
                </button>
                <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
