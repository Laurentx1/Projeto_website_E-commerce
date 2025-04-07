import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mt-6 text-3xl font-bold">Order Confirmed!</h1>
      <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
      <div className="mt-6 rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">Order Number</p>
        <p className="text-xl font-medium">{orderNumber}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          We've sent a confirmation email with order details and tracking information.
        </p>
      </div>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/account/orders">View Order</Link>
        </Button>
      </div>
    </div>
  )
}

