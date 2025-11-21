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
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Suspense>
            <main className="flex w-screen flex-col">{children}</main>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
