"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateProductForm from "@/components/products/create-product-form"

export default function CreateProductModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Product</Button>
      </DialogTrigger>
      <DialogContent className="scale-[85%] sm:max-w-[425px] md:scale-100">
        <DialogHeader>
          <DialogTitle>Create a product</DialogTitle>
          <DialogDescription />

          <CreateProductForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
