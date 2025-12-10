"use client"

import { useState } from "react"
import { Fragment } from "react/jsx-runtime"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "usehooks-ts"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const BreadcrumbsComponent = () => {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [open, setOpen] = useState(false)

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        {pathNames.length > 0 && <BreadcrumbSeparator />}

        {isDesktop ? (
          pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`
            const linkName = link[0].toUpperCase() + link.slice(1, link.length)
            const isLastPath = pathNames.length === index + 1
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {!isLastPath ? (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{linkName}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
              </Fragment>
            )
          })
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger aria-label="Toggle Menu">
              <BreadcrumbEllipsis className="h-4 w-4" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Navigate to</DrawerTitle>
                <DrawerDescription>
                  Select a page to navigate to.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-1 p-4">
                {pathNames.slice(0, -1).map((link, index) => {
                  const href = `/${pathNames.slice(0, index + 1).join("/")}`
                  const linkName =
                    link[0].toUpperCase() + link.slice(1, link.length)
                  const isLastPath = pathNames.length === index + 1

                  return (
                    <Link key={index} href={href} className="py-1 text-sm">
                      {linkName}
                    </Link>
                  )
                })}
              </div>
            </DrawerContent>
          </Drawer>
        )}

        {!isDesktop && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbPage>
              {pathNames.slice(-1)[0].length > 38
                ? pathNames.slice(-1)[0].substring(0, 35) + "..."
                : pathNames.slice(-1)[0]}
            </BreadcrumbPage>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbsComponent
