"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-16">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your email and password to access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Forgot password?
                    </Button>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create a new account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                  Create Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
          Sign Out
        </Button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-6">
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/account">Account Overview</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/account/orders">Orders</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/account/addresses">Addresses</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/wishlist">Wishlist</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/account/settings">Settings</Link>
              </Button>
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>View and update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View your recent orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                  <div>Order</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Total</div>
                  <div></div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>#ORD-123456</div>
                    <div>Mar 15, 2023</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                    </div>
                    <div>$78.99</div>
                    <div>
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href="/account/orders/123456">View</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>#ORD-123457</div>
                    <div>Feb 28, 2023</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                    </div>
                    <div>$54.99</div>
                    <div>
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href="/account/orders/123457">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" asChild>
                  <Link href="/account/orders">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

