"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Menu, User, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation"

/**
 * SiteHeader component - Main navigation header for the site
 *
 * Features:
 * - Responsive design with mobile menu
 * - Search functionality
 * - Cart indicator with item count
 * - User account and wishlist links
 * - Active link highlighting
 * - Sticky positioning
 */
export function SiteHeader() {
  const { cartItems, itemCount } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isScrolled ? "bg-background/95" : "bg-background"
      } transition-colors duration-200`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Candelle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 md:flex">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Link href="/wishlist" className="hidden md:flex">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Account */}
          <Link href="/account" className="hidden md:flex">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-1 relative">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Candelle</span>
                  </Link>
                  <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-4 mt-8">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/shop", label: "Shop" },
                    { href: "/about", label: "About" },
                    { href: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(link.href) ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2"></div>
                  <Link href="/account" className="text-sm font-medium transition-colors hover:text-primary">
                    Account
                  </Link>
                  <Link href="/wishlist" className="text-sm font-medium transition-colors hover:text-primary">
                    Wishlist
                  </Link>
                </nav>

                <div className="mt-auto border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Candelle. All rights reserved.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-b py-3 bg-background">
          <div className="container">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search for candles..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Search products"
              />
              <Button type="submit">Search</Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

