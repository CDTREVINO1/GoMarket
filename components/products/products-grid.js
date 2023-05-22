import Product from "./product";

const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <ul className="grid border border-gray-200 rounded-lg sm:grid-cols-3 dark:border-gray-700">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          images={product.images}
        />
      ))}
    </ul>
  );
};

export default ProductsGrid;
