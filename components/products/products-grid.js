import Product from "./product";
import Footer from "components/layout/footer";

const ProductsGrid = ({ products }) => {
  return (
    <main>
      <ul className="grid border border-gray-200 bg-gray-50 dark:border-gray-700 sm:grid-cols-3">
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
