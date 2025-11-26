"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search as SearchIcon, X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/shadcn-io/icon-button"

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || ""
  )

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 600)

  const handleClear = () => {
    setSearchValue("")
    const params = new URLSearchParams(searchParams)
    params.delete("query")
    params.set("page", "1")
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        type="text"
        className="w-full rounded-lg border px-3 py-2 pr-10 pl-10 text-sm"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          handleSearch(e.target.value)
        }}
      />
      {searchValue && (
        <IconButton
          icon={X}
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-900"
          aria-label="Clear search"
        />
      )}
    </div>
  )
}
