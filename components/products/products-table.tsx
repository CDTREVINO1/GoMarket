"use client"

import { useState } from "react"
import type { Prisma } from "@/generated/prisma/browser"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ArchiveProductDialog from "./archive-product-dialog"
import EditProductSheet from "./edit-product-sheet"

type Product = Prisma.ProductModel

export default function ProductsTable({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("all")

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  })

  const filteredProducts = () => {
    if (filter === "available") {
      return products.filter((product) => product.availability === true)
    } else if (filter === "archived") {
      return products.filter((product) => product.availability === false)
    } else return products
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list-placeholder">
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => setFilter("all")}
        className={`mr-4 rounded-lg border border-blue-500 px-8 py-2 text-center shadow-md focus:outline-none ${
          filter === "all"
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary hover:bg-blue-50"
        } `}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter("available")}
        className={`mr-4 rounded-lg border border-blue-500 px-4 py-2 text-center shadow-md focus:outline-none ${
          filter === "available"
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary hover:bg-blue-50"
        } `}
      >
        Available
      </Button>
      <Button
        onClick={() => setFilter("archived")}
        className={`rounded-lg border border-blue-500 px-4 py-2 text-center shadow-md focus:outline-none ${
          filter === "archived"
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary hover:bg-blue-50"
        } `}
      >
        Archived
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Date Updated</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts()?.length === 0 && (
            <TableRow>
              <TableCell>No products matched for criteria.</TableCell>
            </TableRow>
          )}
          {filteredProducts()?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{dateFormatter.format(product.createdAt)}</TableCell>
              <TableCell>{dateFormatter.format(product.updatedAt)}</TableCell>
              <TableCell>
                <EditProductSheet product={product} />
              </TableCell>
              <TableCell>
                <ArchiveProductDialog
                  productId={product.id}
                  isAvailable={product.availability}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
