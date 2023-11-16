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
                <Link
                  href={link.url}
                  className="text-gray-600 hover:scale-110 hover:text-gray-800"
                >
                  {link.label}
                </Link>
                <ChevronRightIcon className="h-4 w-10" />
              </>
            ) : (
              <span className="text-gray-900">{link.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
