import { Suspense } from "react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import Providers from "@/app/providers"

import "./globals.css"

export const metadata = {
  title: "Home",
  description: "Welcome to the Online Store",
  name: "viewport",
  content: "initial-scale=1.0, width=device-width height=device-height",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex h-full w-screen flex-col">
        <Providers>
          <Header />
          <Suspense>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
