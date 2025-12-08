"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CategoryFilterProps {
  availableCategories: string[]
  selectedCategories: string[]
  productCounts: Record<string, number>
}

export default function CategoryFilter({
  availableCategories,
  selectedCategories = [],
  productCounts,
}: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCategoryToggle = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = selectedCategories

    let updated: string[]
    if (current.includes(category)) {
      updated = current.filter((c) => c !== category)
    } else {
      updated = [...current, category]
    }

    if (updated.length === 0) {
      params.delete("categories")
    } else {
      params.set("categories", updated.join(","))
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("categories")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Categories
            {selectedCategories && selectedCategories.length > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {selectedCategories.length}
              </span>
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Filter by Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableCategories.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-gray-500">
              No categories available
            </div>
          ) : (
            availableCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
                <span className="ml-auto text-xs text-gray-500">
                  ({productCounts[category] || 0})
                </span>
              </DropdownMenuCheckboxItem>
            ))
          )}

          {selectedCategories && selectedCategories.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs"
                  onClick={handleClearAll}
                >
                  Clear All Filters
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedCategories && selectedCategories.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="gap-1 text-gray-600"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
