import Image from "next/image";

// TODO: Include title, price, image(s), add to cart, & product info.
const ProductDetails = (props) => {
  const { title, price, description, rating, images } = props;

  return (
    <>
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <Image
              src={images[0]}
              alt="Picture of product."
              width={250}
              height={250}
              className="object-cover object-center w-full h-64 rounded lg:w-1/2 lg:h-auto"
            />
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                {title}
              </h1>

              <h3>⭐️{rating}</h3>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed">{description}</p>
              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
                <div className="flex items-center ml-6">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="text-2xl font-medium text-gray-900 title-font">
                  ${price}
                </span>
                <button className="flex px-6 py-2 ml-auto text-white bg-blue-500 border-0 rounded focus:outline-none hover:bg-blue-600">
                  Add to Cart
                </button>
                <button className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24">
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
