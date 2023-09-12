import { getProducts } from "lib/pos/queries/product";
import ArchiveProductModal from "./archive-product-modal";
import EditProductModal from "./edit-product-modal";

export default async function ProductsList() {
  const products = await getProducts();

  return (
    <ul>
      {products?.map((product) => (
        <li key={product._id} className="my-2">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>Created {product.createdAt}</p>
          <p>Updated {product.updatedAt}</p>
          <EditProductModal product={product} />
          <ArchiveProductModal productId={product._id} />
        </li>
      ))}
    </ul>
  );
}
