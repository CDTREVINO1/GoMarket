import Footer from "components/layout/footer";
import Product from "./product";

const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <main>
      <ul className="grid border-gray-200 bg-[#E0F2FF] dark:border-gray-700 sm:grid-cols-3">
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
