import ProductDetails from "../../../../components/products/product-details";

export async function generateMetadata({ params }) {
  const { id } = params;

  const product = await fetchProduct(id);

  return {
    title: product.title,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((product) => product.id);
}

async function fetchProduct(id) {
  const productResponse = await fetch(`https://dummyjson.com/products/${id}`);

  return productResponse.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  const product = await fetchProduct(id);

  const { title, description, price, rating, images } = product;

  return (
    <>
      <ProductDetails
        title={title}
        price={price}
        description={description}
        rating={rating}
        images={images}
      />
    </>
  );
}
