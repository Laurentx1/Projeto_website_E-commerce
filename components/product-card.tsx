"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { getProductAverageRating } from "@/lib/products"
import { cn, formatPrice } from "@/lib/utils"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

/**
 * ProductCard component - Displays a product in a card format
 *
 * Features:
 * - Responsive design
 * - Add to cart functionality
 * - Wishlist button
 * - Sale badge for discounted items
 * - Rating display
 * - Quick hover actions
 *
 * @param product The product to display
 * @param className Optional additional CSS classes
 * @param priority Whether to prioritize image loading (for visible cards)
 */
export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Get product rating
  const rating = getProductAverageRating(product.id)

  // Calculate discount percentage if product is on sale
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background p-2 transition-all duration-300 hover:shadow-md",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image with overlay actions */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted/20">
        <Link href={`/shop/${product.id}`}>
          <div className={cn("transition-opacity duration-300", isImageLoaded ? "opacity-100" : "opacity-0")}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>

          {/* Image loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </Link>

        {/* Sale badge */}
        {discountPercentage && (
          <Badge variant="destructive" className="absolute left-2 top-2">
            {discountPercentage}% OFF
          </Badge>
        )}

        {/* Out of stock badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Badge variant="outline" className="bg-background px-3 py-1 text-sm font-medium">
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Wishlist button */}
        <div className="absolute right-2 top-2 z-10">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full opacity-70 transition-opacity hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick actions overlay */}
        {product.stock > 0 && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Button variant="secondary" size="sm" className="mx-2" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="pt-3">
        {/* Category */}
        <div className="text-xs text-muted-foreground">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>

        {/* Product name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-medium line-clamp-1 hover:underline">{product.name}</h3>
        </Link>

        {/* Rating */}
        {rating && (
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <p className="font-medium text-primary">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        className="mt-2 w-full"
        variant={isInCart(product.id) ? "secondary" : "default"}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : isInCart(product.id) ? "Add More" : "Add to Cart"}
      </Button>
    </div>
  )
}

