"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IconButton } from "@/components/ui/shadcn-io/icon-button"

import { handleArchiveProduct } from "./actions"

export default function ArchiveProductDialog({
  productId,
  isAvailable,
}: {
  productId: string
  isAvailable: boolean
}) {
  const router = useRouter()
  const conditionText = isAvailable ? "Archive" : "Unarchive"

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <IconButton icon={Trash2} color={[239, 68, 68]} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{conditionText} Product </AlertDialogTitle>

          {isAvailable ? (
            <AlertDialogDescription>
              Archiving will hide this product from new purchases. Are you sure
              you want to archive this product?
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription>
              Unarchiving will reveal this product for new purchases. Are you
              sure you want to unarchive this product?
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => {
              handleArchiveProduct(productId, isAvailable)
              router.refresh()
            }}
          >
            {conditionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
