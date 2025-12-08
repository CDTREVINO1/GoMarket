import { Suspense } from "react"
import { Metadata } from "next"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import Providers from "@/app/providers"

import "./globals.css"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Online Store",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex h-full flex-col">
        <Providers>
          <Header />
          <Suspense>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
