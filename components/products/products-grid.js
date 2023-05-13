import Product from "./product";

const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </ul>
  );
};

export default ProductsGrid;
