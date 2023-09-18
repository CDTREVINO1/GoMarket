import Image from "next/image";
import Footer from "components/layout/footer";

const ProductDetails = (props) => {
  const { title, price, description, rating, images } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-16">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/2">
            <Image
              src={images[0]}
              alt="Product"
              width={600}
              height={600}
              className="h-64 w-full rounded-lg object-cover md:h-auto"
            />
          </div>
          <div className="mt-8 w-full md:mt-0 md:w-1/2">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
              {title}
            </h1>
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: rating }, (_, index) => (
                <svg
                  key={index}
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 1.13l1.54 4.63h4.87a.5.5 0 01.36.86l-3.92 2.84 1.5 4.5a.5.5 0 01-.76.57L10 12.83l-3.09 2.5a.5.5 0 01-.76-.57l1.5-4.5-3.92-2.84a.5.5 0 01.36-.86h4.87L10 1.13z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="mb-4 text-gray-600">{description}</p>
            <div className="mb-4 flex items-center">
              <span className="mr-2 font-medium text-gray-800">Size:</span>
              <select className="rounded border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="mb-4 flex">
              <span className="text-2xl font-semibold text-gray-800">
                ${price}
              </span>
              <button className="ml-4 rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 focus:outline-none">
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
