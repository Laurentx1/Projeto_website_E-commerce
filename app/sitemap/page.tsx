import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap | Candelle",
  description: "Find all pages on our website",
}

export default function SitemapPage() {
  // Define site structure
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "My Account", href: "/account" },
        { name: "Orders", href: "/account/orders" },
        { name: "Addresses", href: "/account/addresses" },
        { name: "Settings", href: "/account/settings" },
        { name: "Wishlist", href: "/wishlist" },
      ],
    },
    {
      title: "Shopping",
      links: [
        { name: "Cart", href: "/cart" },
        { name: "Checkout", href: "/checkout" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/legal/privacy-policy" },
        { name: "Terms of Service", href: "/legal/terms-of-service" },
      ],
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center">Sitemap</h1>
        <p className="mt-2 text-center text-muted-foreground">Find all pages on our website</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {siteStructure.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-primary hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

