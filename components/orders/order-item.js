import Link from "next/link";
import Image from "next/image";

export default function OrderItem({ item }) {
  const { name, price, images, handle } = item.product;
  const linkPath = `/product/${handle}`;

  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <Link href={linkPath} className="flex items-center space-x-4">
        <div className="relative h-20 w-20">
          <Image
            src={images[0]}
            alt={name}
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600 hover:underline">
            {name}
          </p>
          <p className="text-gray-600">Price: ${price}</p>
        </div>
      </Link>
      <p className="ml-auto text-lg font-semibold">
        Total: ${price * item.quantity}
      </p>
    </div>
  );
}
