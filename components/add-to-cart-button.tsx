"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: Product
  className?: string
  showQuantity?: boolean
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  onAddToCart?: () => void
}

/**
 * AddToCartButton component - Button to add products to cart with quantity controls
 *
 * Features:
 * - Quantity adjustment controls
 * - Stock limit enforcement
 * - Success animation
 * - Customizable appearance
 *
 * @param product The product to add to cart
 * @param className Optional additional CSS classes
 * @param showQuantity Whether to show quantity controls (default: true)
 * @param variant Button variant (default: 'default')
 * @param size Button size (default: 'default')
 * @param onAddToCart Optional callback function when product is added to cart
 */
export default function AddToCartButton({
  product,
  className,
  showQuantity = true,
  variant = "default",
  size = "default",
  onAddToCart,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart, isInCart, getItemQuantity } = useCart()

  // Update quantity if product is already in cart
  useEffect(() => {
    const cartQuantity = getItemQuantity(product.id)
    if (cartQuantity > 0) {
      setQuantity(cartQuantity)
    }
  }, [product.id, getItemQuantity])

  // Decrease quantity (minimum 1)
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // Increase quantity (maximum product stock)
  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1
      return newQuantity <= product.stock ? newQuantity : prev
    })
  }

  // Add product to cart with animation
  const handleAddToCart = () => {
    if (product.stock === 0) return

    setIsAdding(true)
    addToCart(product, quantity)

    // Call optional callback
    if (onAddToCart) {
      onAddToCart()
    }

    // Reset after animation
    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }

  // If product is out of stock
  if (product.stock === 0) {
    return (
      <Button className={cn("w-full", className)} disabled>
        Out of Stock
      </Button>
    )
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Quantity controls */}
      {showQuantity && (
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="h-9 w-9 rounded-r-none"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex h-9 w-12 items-center justify-center border-y border-input bg-transparent text-center">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
            className="h-9 w-9 rounded-l-none"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Add to cart button */}
      <Button
        className={cn("w-full", className)}
        onClick={handleAddToCart}
        variant={variant}
        size={size}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Check className="mr-2 h-4 w-4 animate-in zoom-in-50 duration-300" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
          </>
        )}
      </Button>
    </div>
  )
}

