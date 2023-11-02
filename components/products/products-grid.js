import Product from "./product";
import CategorySection from "./category-section";
import Footer from "components/layout/footer";

const ProductsGrid = ({ products }) => {
  return (
    <main className="w-screen">
      <CategorySection products={products} />
      <ul className="grid m-auto border-gray-200 max-w-fit dark:border-gray-700 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
