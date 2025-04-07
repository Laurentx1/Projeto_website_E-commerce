"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { getAllProducts } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

/**
 * WishlistPage component - Displays user's saved items
 *
 * Features:
 * - List of saved products
 * - Add to cart functionality
 * - Remove from wishlist
 * - Empty state
 * - Persistent storage
 */
export default function WishlistPage() {
  // In a real app, this would come from a database
  // For demo purposes, we'll use localStorage
  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("candelle-wishlist")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const { addToCart } = useCart()
  const allProducts = getAllProducts()

  // Get full product details for wishlist items
  const wishlistProducts = allProducts.filter((product) => wishlistItems.includes(product.id))

  // Remove item from wishlist
  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlistItems.filter((id) => id !== productId)
    setWishlistItems(newWishlist)
    localStorage.setItem("candelle-wishlist", JSON.stringify(newWishlist))
  }

  // Add demo items if wishlist is empty (for demonstration)
  const addDemoItems = () => {
    const demoItems = allProducts.slice(0, 3).map((p) => p.id)
    setWishlistItems(demoItems)
    localStorage.setItem("candelle-wishlist", JSON.stringify(demoItems))
  }

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="container px-4 py-16 text-center md:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-4 rounded-full bg-primary/10 p-6">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="mt-2 text-muted-foreground">Save your favorite items to come back to them later.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
            <Button variant="outline" onClick={addDemoItems}>
              Add Demo Items
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>

      <div className="mt-8">
        <div className="rounded-lg border">
          <div className="p-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:gap-6 border-b last:border-0"
              >
                {/* Product image */}
                <div className="flex-shrink-0">
                  <Link href={`/shop/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  </Link>
                </div>

                {/* Product details */}
                <div className="flex flex-1 flex-col gap-1">
                  <Link href={`/shop/${product.id}`} className="font-medium hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.shortDescription}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-medium text-primary">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:items-end">
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full sm:w-auto"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-full sm:w-auto text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

