import Link from "next/link"
import Image from "next/image"
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  PinIcon as Pinterest,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ChevronRight,
  Heart,
} from "lucide-react"
import NewsletterSignup from "@/components/newsletter-signup"

/**
 * SiteFooter component - Enhanced footer for the Candelle e-commerce site
 *
 * Features:
 * - Modern, visually appealing design
 * - Fully responsive layout with optimized spacing
 * - Organized content sections with clear visual hierarchy
 * - Newsletter signup with engaging design
 * - Social media integration with hover effects
 * - Comprehensive contact information
 * - Trust indicators and payment methods
 * - Accessible navigation and semantic markup
 * - Optimized for all screen sizes
 */
export function SiteFooter() {
  // Current year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/20">
      {/* Newsletter banner */}
      <div className="border-b bg-primary/5 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-3 inline-block rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Join Our Newsletter</h2>
            <p className="mb-6 max-w-[600px] text-muted-foreground md:text-lg">
              Subscribe for exclusive offers, new arrivals, and candle care tips. Get 10% off your first order!
            </p>
            <NewsletterSignup />
            <p className="mt-3 text-xs text-muted-foreground">
              By subscribing, you agree to our{" "}
              <Link href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </Link>
              . We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Company info and social media */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Link href="/" className="inline-block">
                <div className="flex items-center space-x-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <span className="text-xl font-bold">Candelle</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground">
                Premium handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks for a
                clean, long-lasting burn.
              </p>
            </div>

            {/* Social media links */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Follow Us</h3>
              <div className="flex space-x-2">
                {[
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Pinterest, label: "Pinterest", href: "#" },
                  { icon: Youtube, label: "YouTube", href: "#" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="group flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">We're Certified</h3>
              <div className="flex flex-wrap gap-2">
                {["100% Cruelty Free", "Eco-Friendly", "Handcrafted in USA", "Sustainable", "Vegan Friendly"].map(
                  (badge) => (
                    <div key={badge} className="rounded-full border bg-background px-3 py-1 text-xs font-medium">
                      {badge}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Shop</h3>
              <ul className="space-y-2">
                {[
                  { label: "All Products", href: "/shop" },
                  { label: "Bestsellers", href: "/shop" },
                  { label: "New Arrivals", href: "/shop?sort=newest" },
                  { label: "Sale", href: "/shop" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Collections</h3>
              <ul className="space-y-2">
                {[
                  { label: "Classic Collection", href: "/shop?category=classic" },
                  { label: "Seasonal Scents", href: "/shop?category=seasonal" },
                  { label: "Premium Collection", href: "/shop?category=premium" },
                  { label: "Relaxation", href: "/shop?category=relaxation" },
                  { label: "Fresh & Clean", href: "/shop?category=fresh" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">About</h3>
              <ul className="space-y-2">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "Our Process", href: "/about#process" },
                  { label: "Sustainability", href: "/about#sustainability" },
                  { label: "FAQs", href: "/faq" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Customer Service</h3>
              <ul className="space-y-2">
                {[
                  { label: "Contact Us", href: "/contact" },
                  { label: "Shipping & Returns", href: "/about" },
                  { label: "Track Your Order", href: "/account/orders" },
                  { label: "Privacy Policy", href: "/legal/privacy-policy" },
                  { label: "Terms of Service", href: "/legal/terms-of-service" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact information */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="mr-3 mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Email Us</p>
                    <a
                      href="mailto:hello@candelle.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      hello@candelle.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="mr-3 mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <a
                      href="tel:+15551234567"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      (555) 123-4567
                    </a>
                    <p className="text-xs text-muted-foreground">Mon-Fri: 9am-5pm EST</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-3 mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Visit Our Store</p>
                    <address className="not-italic text-sm text-muted-foreground">
                      123 Candle Lane
                      <br />
                      Waxville, CA 90210
                      <br />
                      United States
                    </address>
                  </div>
                </li>
              </ul>
            </div>

            {/* Payment methods */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Visa", icon: CreditCard },
                  { name: "Mastercard", icon: CreditCard },
                  { name: "Amex", icon: CreditCard },
                  { name: "Discover", icon: CreditCard },
                  { name: "PayPal", icon: CreditCard },
                  { name: "Mercado Pago", icon: CreditCard },
                ].map((payment) => (
                  <div
                    key={payment.name}
                    className="flex items-center rounded-md border bg-background px-2 py-1 text-xs font-medium"
                  >
                    <payment.icon className="mr-1 h-3 w-3" />
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured products or categories */}
        <div className="mt-16 border-t pt-10">
          <h3 className="mb-6 text-center text-sm font-medium uppercase tracking-wider">Featured Collections</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[
              { name: "Classic", image: "/placeholder.svg?height=120&width=120", href: "/shop?category=classic" },
              { name: "Relaxation", image: "/placeholder.svg?height=120&width=120", href: "/shop?category=relaxation" },
              { name: "Fresh", image: "/placeholder.svg?height=120&width=120", href: "/shop?category=fresh" },
              { name: "Seasonal", image: "/placeholder.svg?height=120&width=120", href: "/shop?category=seasonal" },
              { name: "Premium", image: "/placeholder.svg?height=120&width=120", href: "/shop?category=premium" },
            ].map((collection) => (
              <Link key={collection.name} href={collection.href} className="group flex flex-col items-center">
                <div className="relative mb-2 h-20 w-20 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium group-hover:text-primary">{collection.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom footer with copyright and legal links */}
      <div className="border-t bg-muted/30">
        <div className="container flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">© {currentYear} Candelle. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">
              Handcrafted with <Heart className="inline-block h-3 w-3 text-red-500 fill-red-500" /> in California
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

