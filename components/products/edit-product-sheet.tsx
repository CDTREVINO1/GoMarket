import { useState } from "react"
import { SquarePen } from "lucide-react"

import { IconButton } from "@/components/ui/shadcn-io/icon-button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import EditProductForm from "./edit-product-form"

export default function EditProductSheet({
  product,
}: {
  product: {
    title: string
    description: string
    price: number
    category: string
    id: string
    images: string[]
    handle: string
    createdAt: Date
    updatedAt: Date
    stripePriceId: string | null
    availability: boolean
  }
}) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton icon={SquarePen} color={[59, 130, 246]} />
      </SheetTrigger>
      <SheetContent className="max-h-screen w-screen overflow-y-scroll sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <EditProductForm
          product={product}
          onCloseAction={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
