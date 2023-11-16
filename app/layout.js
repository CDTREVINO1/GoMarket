import { Suspense } from "react"
import Header from "components/layout/header"

import "./globals.css"

export const metadata = {
  title: "Home",
  description: "Welcome to the Online Store",
  name: "viewport",
  content: "initial-scale=1.0, width=device-width height=device-height",
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Suspense>
          <main className="flex flex-col w-screen h-screen">{children}</main>
        </Suspense>
      </body>
    </html>
  )
}
