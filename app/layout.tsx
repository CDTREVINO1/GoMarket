import { Suspense } from "react"
import { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import Providers from "@/app/providers"

import "./globals.css"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
})

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-col ${interSans.variable} ${jetBrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          <Suspense>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
