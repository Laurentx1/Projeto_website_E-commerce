import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"

// Load Inter font with Latin subset
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Candelle - Handcrafted Candles for Your Home",
    template: "%s | Candelle",
  },
  description:
    "Premium handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks for a clean, long-lasting burn.",
  keywords: ["candles", "handcrafted", "soy wax", "home decor", "fragrance", "gifts"],
  authors: [{ name: "Candelle" }],
  creator: "Candelle",
  publisher: "Candelle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://candelle-shop.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://candelle-shop.vercel.app",
    title: "Candelle - Handcrafted Candles for Your Home",
    description: "Premium handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks.",
    siteName: "Candelle",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Candelle - Handcrafted Candles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candelle - Handcrafted Candles for Your Home",
    description: "Premium handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks.",
    images: ["/twitter-image.jpg"],
    creator: "@candelle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

/**
 * RootLayout - The main layout wrapper for the entire application
 *
 * This component:
 * - Sets up the font
 * - Provides theme context
 * - Provides cart context
 * - Includes global header and footer
 * - Sets up toast notifications
 *
 * @param children The page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'