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
import { Prisma } from "@/generated/prisma/browser"

import EditProductForm from "./edit-product-form"

type Product = Prisma.ProductModel

export default function EditProductSheet({
    product,
}: {
    product: Product
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
