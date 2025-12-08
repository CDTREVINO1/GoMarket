"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadcrumbsComponent = ({ links }) => {
  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={index}>
            {index < links.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={link.url} className="hover:scale-110">
                    {link.label}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-5" />
                </BreadcrumbSeparator>
              </>
            ) : (
              <span>{link.label}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbsComponent
