import Head from "next/head";
import ProductDetails from "../../components/products/product-details";

const ProductDetailPage = (props) => {
  const { title, description, price, rating, images } = props.productData;

  return (
    <>
      <Head>
        <title>{props.productData.title}</title>
        <meta name="description" content={description} />
      </Head>
      <ProductDetails
        title={title}
        price={price}
        description={description}
        rating={rating}
        images={images}
      />
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const { id } = params;

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const productData = await response.json();

  return {
    props: {
      productData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  const productIds = data.products.map((product) => product.id.toString());

  return {
    paths: productIds.map((id) => ({ params: { id: id } })),
    fallback: false,
  };
}

export default ProductDetailPage;
