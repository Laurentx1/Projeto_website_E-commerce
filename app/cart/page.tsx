"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

/**
 * CartPage component - Shopping cart page
 *
 * Features:
 * - Cart item display with images
 * - Quantity adjustment
 * - Item removal
 * - Price calculations
 * - Coupon code input
 * - Empty cart state
 */
export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, itemCount } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Calculate shipping, tax, and total
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate API call to validate coupon
    setTimeout(() => {
      setIsApplyingCoupon(false)
      alert(`Coupon "${couponCode}" is invalid or has expired.`)
    }, 1000)
  }

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <div className="mb-4 rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <p className="text-muted-foreground">
        You have {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:gap-6 border-b last:border-0"
                >
                  {/* Product image */}
                  <div className="flex-shrink-0">
                    <Link href={`/shop/${item.product.id}`}>
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                    </Link>
                  </div>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col gap-1">
                    <Link href={`/shop/${item.product.id}`} className="font-medium hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>

                    {/* Show any applied discounts */}
                    {item.product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </p>
                        <span className="text-xs text-red-600">
                          Save ${(item.product.originalPrice - item.product.price).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>

                  {/* Item total and remove button */}
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="rounded-lg border">
            <div className="p-6">
              <h2 className="text-lg font-medium">Order Summary</h2>

              {/* Price breakdown */}
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {/* Coupon code input */}
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode.trim()}
                  >
                    {isApplyingCoupon ? "Applying..." : "Apply"}
                  </Button>
                </div>

                {/* Order total */}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Free shipping message */}
                {subtotal < 50 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping.
                  </p>
                )}
              </div>

              {/* Checkout button */}
              <Button asChild className="mt-6 w-full">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Continue shopping link */}
              <div className="mt-4 text-center">
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Accepted payment methods */}
          <div className="mt-6 rounded-lg border p-4">
            <h3 className="text-sm font-medium">We Accept</h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="rounded border bg-background px-2 py-1 text-xs">Visa</div>
              <div className="rounded border bg-background px-2 py-1 text-xs">Mastercard</div>
              <div className="rounded border bg-background px-2 py-1 text-xs">PayPal</div>
              <div className="rounded border bg-background px-2 py-1 text-xs">Mercado Pago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

