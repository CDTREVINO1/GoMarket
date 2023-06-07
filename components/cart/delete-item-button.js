import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import clsx from "clsx";

export default function DeleteItemButton({ item }) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  return <button></button>;
}
