"use client"

import { useState } from "react"
import { PackagePlus } from "lucide-react"

import { IconButton } from "@/components/ui/shadcn-io/icon-button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CreateProductForm from "@/components/products/create-product-form"

export default function CreateProductSheet() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton icon={PackagePlus} />
      </SheetTrigger>
      <SheetContent className="max-h-screen w-screen overflow-y-scroll sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Create a new product</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <CreateProductForm onCloseAction={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
