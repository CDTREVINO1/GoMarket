import { Suspense } from "react"
import { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import Providers from "@/app/providers"

import "./globals.css"

import LoadingSkeleton from "@/components/layout/LoadingSkeleton"

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
  description: "Welcome to GoMarket",
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
          <main className="flex-1">
            <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
          </main>
          <Toaster position="top-right" />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
