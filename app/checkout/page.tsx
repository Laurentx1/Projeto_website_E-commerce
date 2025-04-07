"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, CreditCard, Wallet, AlertCircle } from "lucide-react"

/**
 * CheckoutPage component - Handles the checkout process
 *
 * Features:
 * - Shipping information collection
 * - Payment method selection
 * - Order summary
 * - Form validation
 * - Order placement
 */
export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, subtotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [billingIsSame, setBillingIsSame] = useState(true)

  // Calculate shipping, tax, and total
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const formValues: Record<string, string> = {}

    // Convert FormData to object
    formData.forEach((value, key) => {
      formValues[key] = value.toString()
    })

    // Validate form
    const errors: Record<string, string> = {}

    // Required fields for shipping
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ]

    // Check required fields
    requiredFields.forEach((field) => {
      if (!formValues[field] || formValues[field].trim() === "") {
        errors[field] = "This field is required"
      }
    })

    // Email validation
    if (formValues.email && !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formValues.phone && !/^\d{10,15}$/.test(formValues.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid phone number"
    }

    // Payment method validation
    if (paymentMethod === "credit-card") {
      // Card number validation
      if (!formValues.cardNumber || !/^\d{16}$/.test(formValues.cardNumber.replace(/\D/g, ""))) {
        errors.cardNumber = "Please enter a valid 16-digit card number"
      }

      // Expiry validation
      if (!formValues.expiry || !/^\d{2}\/\d{2}$/.test(formValues.expiry)) {
        errors.expiry = "Please enter a valid expiry date (MM/YY)"
      }

      // CVC validation
      if (!formValues.cvc || !/^\d{3,4}$/.test(formValues.cvc)) {
        errors.cvc = "Please enter a valid CVC code"
      }

      // Name on card validation
      if (!formValues.nameOnCard || formValues.nameOnCard.trim() === "") {
        errors.nameOnCard = "Please enter the name on your card"
      }
    }

    // If there are errors, show them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)

      // Scroll to the first error
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`)
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      return
    }

    // Clear any previous errors
    setFormErrors({})

    // Submit the form
    setIsSubmitting(true)

    // Simulate API call to process order
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      router.push("/checkout/success")
    }, 2000)
  }

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <div className="mb-4 rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">You need to add items to your cart before checking out.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your order by providing your shipping and payment details.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className={formErrors.firstName ? "border-destructive" : ""}
                  />
                  {formErrors.firstName && <p className="text-xs text-destructive">{formErrors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className={formErrors.lastName ? "border-destructive" : ""}
                  />
                  {formErrors.lastName && <p className="text-xs text-destructive">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={formErrors.email ? "border-destructive" : ""}
                />
                {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={formErrors.phone ? "border-destructive" : ""}
                />
                {formErrors.phone && <p className="text-xs text-destructive">{formErrors.phone}</p>}
              </div>

              {/* Shipping Address */}
              <Separator className="my-4" />
              <h3 className="text-sm font-medium">Shipping Address</h3>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  className={formErrors.address ? "border-destructive" : ""}
                />
                {formErrors.address && <p className="text-xs text-destructive">{formErrors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" name="apartment" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required className={formErrors.city ? "border-destructive" : ""} />
                  {formErrors.city && <p className="text-xs text-destructive">{formErrors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" required className={formErrors.state ? "border-destructive" : ""} />
                  {formErrors.state && <p className="text-xs text-destructive">{formErrors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    required
                    className={formErrors.postalCode ? "border-destructive" : ""}
                  />
                  {formErrors.postalCode && <p className="text-xs text-destructive">{formErrors.postalCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    className={formErrors.country ? "border-destructive" : ""}
                  />
                  {formErrors.country && <p className="text-xs text-destructive">{formErrors.country}</p>}
                </div>
              </div>

              {/* Billing Address Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="billing-same"
                  checked={billingIsSame}
                  onCheckedChange={(checked) => setBillingIsSame(checked as boolean)}
                />
                <Label htmlFor="billing-same" className="text-sm font-normal">
                  Billing address is the same as shipping address
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex flex-1 items-center cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Label>
                  <div className="flex items-center gap-1">
                    <div className="rounded border bg-background px-2 py-1 text-xs">Visa</div>
                    <div className="rounded border bg-background px-2 py-1 text-xs">MC</div>
                    <div className="rounded border bg-background px-2 py-1 text-xs">Amex</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex flex-1 items-center cursor-pointer">
                    <Wallet className="mr-2 h-4 w-4" />
                    PayPal
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="mercado-pago" id="mercado-pago" />
                  <Label htmlFor="mercado-pago" className="flex flex-1 items-center cursor-pointer">
                    <Wallet className="mr-2 h-4 w-4" />
                    Mercado Pago
                  </Label>
                </div>
              </RadioGroup>

              {/* Credit Card Details */}
              {paymentMethod === "credit-card" && (
                <div className="space-y-4 pt-3">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required={paymentMethod === "credit-card"}
                      className={formErrors.cardNumber ? "border-destructive" : ""}
                    />
                    {formErrors.cardNumber && <p className="text-xs text-destructive">{formErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        required={paymentMethod === "credit-card"}
                        className={formErrors.expiry ? "border-destructive" : ""}
                      />
                      {formErrors.expiry && <p className="text-xs text-destructive">{formErrors.expiry}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        required={paymentMethod === "credit-card"}
                        className={formErrors.cvc ? "border-destructive" : ""}
                      />
                      {formErrors.cvc && <p className="text-xs text-destructive">{formErrors.cvc}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      name="nameOnCard"
                      required={paymentMethod === "credit-card"}
                      className={formErrors.nameOnCard ? "border-destructive" : ""}
                    />
                    {formErrors.nameOnCard && <p className="text-xs text-destructive">{formErrors.nameOnCard}</p>}
                  </div>
                </div>
              )}

              {/* Payment Method Notes */}
              <div className="rounded-md bg-muted p-3 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-muted-foreground">
                      All transactions are secure and encrypted. Your payment information is never stored on our
                      servers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order before completing checkout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-2">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{item.product.name}</h4>
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    {item.product.originalPrice && (
                      <p className="text-xs text-muted-foreground">
                        You save: ${((item.product.originalPrice - item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <Separator />

              {/* Price Summary */}
              <div className="space-y-2">
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
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Complete Order"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By completing your purchase, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

