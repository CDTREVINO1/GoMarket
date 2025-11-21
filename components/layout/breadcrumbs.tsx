"use client"

import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/20/solid"

const Breadcrumb = ({ links }) => {
  return (
    <nav className="text-md m-4 mb-4 md:text-lg" aria-label="Breadcrumb">
      <ol className="inline-flex list-none p-0">
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            {index < links.length - 1 ? (
              <>
                <Link href={link.url} className="hover:scale-110">
                  {link.label}
                </Link>
                <ChevronRightIcon className="h-4 w-10" />
              </>
            ) : (
              <span>{link.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
