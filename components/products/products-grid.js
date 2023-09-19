import Footer from "components/layout/footer";
import Product from "./product";
import Link from "next/link";

const ProductsGrid = ({ products }) => {
  return (
    <main>
      <nav className="bg-gray-200 p-4 dark:bg-gray-700">
        <ul className="flex justify-center space-x-4 md:space-x-8 lg:space-x-12">
          <Link
            href="/category/smartphones"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Smartphones
          </Link>
          <Link
            href="/category/laptops"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Laptops
          </Link>
          <Link
            href="/category/perfumes"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Perfumes
          </Link>
          <Link
            href="/category/medicine"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Medicine
          </Link>
          <Link
            href="/category/food"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Food
          </Link>
          <Link
            href="/category/furniture"
            className="text-lg transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-300">
            Furniture
          </Link>
        </ul>
      </nav>

      <ul className="m-auto grid max-w-fit border-gray-200 dark:border-gray-700 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            images={product.images}
            handle={product.handle}
          />
        ))}
      </ul>
      <Footer />
    </main>
  );
};

export default ProductsGrid;
