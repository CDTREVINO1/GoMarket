import Product from "./product";

const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <ul className="grid rounded-lg border border-gray-200 dark:border-gray-700 sm:grid-cols-3">
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
  );
};

export default ProductsGrid;
