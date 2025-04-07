import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import NewsletterSignup from "@/components/newsletter-signup"
import { getFeaturedProducts, getFeaturedCategories, getNewArrivals, getProductsOnSale } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Handcrafted Candles for Your Home | Candelle",
  description:
    "Premium handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks for a clean, long-lasting burn.",
}

/**
 * Home page component - Main landing page for the Candelle shop
 *
 * Sections:
 * - Hero banner
 * - Featured categories
 * - Bestsellers
 * - About/story section
 * - New arrivals
 * - Sale products
 * - Newsletter signup
 */
export default function Home() {
  // Get data for different sections
  const featuredProducts = getFeaturedProducts()
  const featuredCategories = getFeaturedCategories()
  const newArrivals = getNewArrivals(4)
  const saleProducts = getProductsOnSale().slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Handcrafted Candles for Your Home
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Our premium candles are made with 100% natural soy wax, fine fragrance oils, and cotton wicks for a clean,
              long-lasting burn.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="Featured candle collection"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            priority
          />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our collection of handcrafted candles by category
              </p>
            </div>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} priority={index < 3} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Bestsellers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our most popular handcrafted candles that customers love
              </p>
            </div>
          </div>
          <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About/Story Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Image
              src="/placeholder.svg?height=400&width=400"
              width={400}
              height={400}
              alt="Candle making process"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Handcrafted with Love</h2>
              <p className="text-muted-foreground md:text-lg">
                Each candle is carefully handcrafted in our studio using traditional methods and the finest ingredients.
                We take pride in creating products that bring warmth and ambiance to your home.
              </p>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>100% natural soy wax</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Premium fragrance oils</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Cotton wicks for clean burning</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Reusable containers</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/about">Learn About Our Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">New Arrivals</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Check out our latest additions to the Candelle collection
              </p>
            </div>
          </div>
          <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop?sort=newest">View All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sale Products Section */}
      {saleProducts.length > 0 && (
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Special Offers</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">Limited time deals on select candles</p>
              </div>
            </div>
            <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {saleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 2} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/shop?category=sale">View All Sale Items</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Newsletter</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <NewsletterSignup />
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

