import ProductsGrid from "../../components/products/products-grid";

const AllProductsPage = (props) => {
  return (
    <>
      <ProductsGrid products={props.products} />
    </>
  );
};

export default AllProductsPage;

export async function getServerSideProps(context) {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return {
    props: { products: data.products },
  };
}
