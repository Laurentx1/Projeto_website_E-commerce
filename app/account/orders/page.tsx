"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ChevronRight, Package, Search } from "lucide-react"

/**
 * OrdersPage component - Displays user's order history
 *
 * Features:
 * - Order listing with status
 * - Order filtering by status
 * - Order search
 * - Order details
 */
export default function OrdersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock orders data (in a real app, this would come from an API)
  const orders = [
    {
      id: "ORD-123456",
      date: "Mar 15, 2023",
      status: "delivered",
      total: 78.99,
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
      shipping: {
        address: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      trackingNumber: "1Z999AA10123456784",
    },
    {
      id: "ORD-123457",
      date: "Feb 28, 2023",
      status: "delivered",
      total: 54.99,
      items: [
        {
          id: "citrus-grove",
          name: "Citrus Grove",
          price: 22.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "ocean-breeze",
          name: "Ocean Breeze",
          price: 25.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      shipping: {
        address: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      trackingNumber: "1Z999AA10123456785",
    },
    {
      id: "ORD-123458",
      date: "Apr 5, 2023",
      status: "processing",
      total: 29.99,
      items: [
        {
          id: "sandalwood-amber",
          name: "Sandalwood Amber",
          price: 29.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      shipping: {
        address: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      trackingNumber: null,
    },
  ]

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return (
      <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsLoggedIn(true)} className="w-full">
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/account" className="underline underline-offset-4 hover:text-primary">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">View and track your order history</p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{order.id}</h3>
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
                          </div>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            </p>
                          </div>

                          <Button variant="outline" asChild>
                            <Link href={`/account/orders/${order.id}`}>
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex -space-x-4 overflow-hidden">
                          {order.items.map((item, index) => (
                            <div key={index} className="relative h-16 w-16 rounded-md border bg-background">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {order.status === "shipped" && order.trackingNumber && (
                        <div className="mt-4 flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No orders found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "You haven't placed any orders yet"}
                </p>
                {!searchQuery && (
                  <Button asChild className="mt-4">
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="processing" className="mt-4">
            {filteredOrders.filter((order) => order.status === "processing").length > 0 ? (
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.status === "processing")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Processing
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} {order.items.length === 1 ? "item" : "items"}
                              </p>
                            </div>

                            <Button variant="outline" asChild>
                              <Link href={`/account/orders/${order.id}`}>
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex -space-x-4 overflow-hidden">
                            {order.items.map((item, index) => (
                              <div key={index} className="relative h-16 w-16 rounded-md border bg-background">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No processing orders</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any orders currently being processed
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipped" className="mt-4">
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No shipped orders</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any orders currently being shipped</p>
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-4">
            {filteredOrders.filter((order) => order.status === "delivered").length > 0 ? (
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Delivered
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} {order.items.length === 1 ? "item" : "items"}
                              </p>
                            </div>

                            <Button variant="outline" asChild>
                              <Link href={`/account/orders/${order.id}`}>
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex -space-x-4 overflow-hidden">
                            {order.items.map((item, index) => (
                              <div key={index} className="relative h-16 w-16 rounded-md border bg-background">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No delivered orders</h3>
                <p className="mt-2 text-sm text-muted-foreground">You don't have any delivered orders yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

