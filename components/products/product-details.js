import Image from "next/image";
import Footer from "components/layout/footer";

const ProductDetails = (props) => {
  const { title, price, description, rating, images } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8 bg-white md:p-16">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/2">
            <Image
              src={images[0]}
              alt="Product"
              width={600}
              height={600}
              className="object-cover w-full h-64 rounded-lg md:h-auto"
            />
          </div>
          <div className="w-full mt-8 md:mt-0 md:w-1/2">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
              {title}
            </h1>
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: rating }, (_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 fill-current"
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
            <div className="flex items-center mb-4">
              <span className="mr-2 font-medium text-gray-800">Size:</span>
              <select className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="flex mb-4">
              <span className="text-2xl font-semibold text-gray-800">
                ${price}
              </span>
              <button className="p-2 ml-4 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                <svg
                  className="w-6 h-6 fill-current"
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
