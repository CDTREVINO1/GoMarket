"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Footer from "@/components/layout/footer"

import CategorySection from "./category-section"
import Product from "./product"

const ProductsGrid = ({ products }) => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories)
    const queryParams = { categories: selectedCategories.join(",") }
    const params = new URLSearchParams(searchParams)
    if (queryParams.categories) {
      params.set("categories", queryParams.categories)
    } else {
      params.delete("categories")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const categories = searchParams.get("categories")

    if (categories) {
      setSelectedCategories(categories.split(","))
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        selectedCategories.includes(product.category)
      )
      setFilteredProducts(filtered)
    }
  }, [selectedCategories, products])

  return (
    <main className="w-screen">
      <CategorySection
        products={products}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="grid m-auto border-gray-200 max-w-fit dark:border-gray-700 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            images={product.images}
            handle={product.handle}
          />
        ))}
      </ul>
      <Footer />
    </main>
  )
}

export default ProductsGrid
