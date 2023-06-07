import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import clsx from "clsx";

export default function EditItemQuantityButton({ item, type }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  return <button></button>;
}
