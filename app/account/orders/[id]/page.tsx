"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Package, Truck, Calendar, CreditCard } from "lucide-react"

/**
 * OrderDetailsPage component - Displays detailed information about a specific order
 *
 * Features:
 * - Order summary
 * - Order items with images
 * - Shipping information
 * - Payment details
 * - Order status
 * - Tracking information
 */
export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // In a real app, this would fetch from an API
  // Mock order data for demonstration
  const order = {
    id: orderId,
    date: "Mar 15, 2023",
    status: "delivered",
    total: 78.99,
    subtotal: 69.97,
    shipping: 5.99,
    tax: 3.03,
    items: [
      {
        id: "vanilla-dream",
        name: "Vanilla Dream",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "lavender-fields",
        name: "Lavender Fields",
        price: 26.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      phone: "(555) 123-4567",
    },
    billingAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card (Visa ending in 4242)",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    deliveryDate: "Mar 20, 2023",
    orderNotes: "",
  }

  // Order status steps
  const statusSteps = [
    { label: "Order Placed", date: "Mar 15, 2023", completed: true },
    { label: "Processing", date: "Mar 16, 2023", completed: true },
    { label: "Shipped", date: "Mar 17, 2023", completed: true },
    { label: "Delivered", date: "Mar 20, 2023", completed: true },
  ]

  // If order not found
  if (!order) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">Order Not Found</h1>
          <p className="mt-2 text-muted-foreground">We couldn't find an order with the ID {orderId}</p>
          <Button asChild className="mt-6">
            <Link href="/account/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent">
            <Link href="/account/orders">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Order {order.id}</h1>
              <p className="text-muted-foreground">Placed on {order.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>

              <Button variant="outline" size="sm">
                Need Help?
              </Button>
            </div>
          </div>
        </div>

        {/* Order status timeline */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Order Status</h2>

            <div className="mt-4 relative">
              {/* Progress line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-muted" />

              {/* Status steps */}
              <div className="space-y-8">
                {statusSteps.map((step, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                        step.completed ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      {step.completed && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium">{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking information */}
            {order.trackingNumber && (
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="font-medium">Tracking Information</span>
                </div>
                <div className="mt-2 grid gap-1">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Carrier:</span> {order.carrier}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tracking Number:</span> {order.trackingNumber}
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm" asChild>
                    <a
                      href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Track Package
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order details */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Order items */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium">Order Items</h2>

                <div className="mt-4 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 py-4 first:pt-0 last:pb-0 border-b last:border-0">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/shop/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        {order.status === "delivered" && (
                          <Button variant="link" className="mt-2 h-auto justify-start p-0 text-sm" asChild>
                            <Link href={`/shop/${item.id}?review=true`}>Write a Review</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium">Order Summary</h2>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Payment */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Shipping info */}
                <div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Shipping Address</h3>
                  </div>

                  <div className="mt-2 text-sm">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    {order.shippingAddress.phone && <p className="mt-1">{order.shippingAddress.phone}</p>}
                  </div>
                </div>

                {/* Payment info */}
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Payment Method</h3>
                  </div>

                  <p className="mt-2 text-sm">{order.paymentMethod}</p>
                </div>

                {/* Order date */}
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Order Date</h3>
                  </div>

                  <p className="mt-2 text-sm">{order.date}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href="/account/orders">Back to Orders</Link>
          </Button>

          <div className="flex gap-4">
            <Button variant="outline">Download Invoice</Button>
            <Button>Need Help?</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

