"use client"

import Link from "next/link"
import { Suspense } from "react"
import { getAllProducts, getProductsByCategory, searchProducts, getAllCategories } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// Define search params interface
interface SearchParams {
  category?: string
  q?: string
  sort?: string
  page?: string
  minPrice?: string
  maxPrice?: string
}

/**
 * ShopPage component - Main product listing page
 *
 * Features:
 * - Product filtering by category
 * - Product search
 * - Sorting options
 * - Price filtering
 * - Pagination
 * - Responsive grid layout
 *
 * @param searchParams URL search parameters for filtering and sorting
 */
export default function ShopPageClient({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { category, q, sort, page = "1", minPrice, maxPrice } = searchParams
  const currentPage = Number.parseInt(page, 10)
  const productsPerPage = 12

  // Get filtered products based on search params
  let products = category ? getProductsByCategory(category) : getAllProducts()

  // Apply search filter if query exists
  if (q) {
    products = searchProducts(q)
  }

  // Apply price filter if min/max price exists
  if (minPrice || maxPrice) {
    products = products.filter((product) => {
      const min = minPrice ? Number.parseFloat(minPrice) : 0
      const max = maxPrice ? Number.parseFloat(maxPrice) : Number.POSITIVE_INFINITY
      return product.price >= min && product.price <= max
    })
  }

  // Apply sorting
  if (sort) {
    products = [...products].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      if (sort === "name-asc") return a.name.localeCompare(b.name)
      if (sort === "name-desc") return b.name.localeCompare(a.name)
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return 0
    })
  }

  // Calculate pagination
  const totalProducts = products.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage)

  // Get all categories for filter sidebar
  const categories = getAllCategories()

  // Generate pagination links
  const getPaginationLinks = () => {
    const links = []

    // Previous page link
    if (currentPage > 1) {
      links.push(
        <Link
          key="prev"
          href={{
            pathname: "/shop",
            query: { ...searchParams, page: currentPage - 1 },
          }}
          aria-label="Previous page"
        >
          <Button variant="outline" size="sm">
            Previous
          </Button>
        </Link>,
      )
    }

    // Page number links
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        links.push(
          <Link
            key={i}
            href={{
              pathname: "/shop",
              query: { ...searchParams, page: i },
            }}
            aria-label={`Page ${i}`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            <Button variant={i === currentPage ? "default" : "outline"} size="sm" className="w-9">
              {i}
            </Button>
          </Link>,
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        links.push(
          <Button key={`ellipsis-${i}`} variant="outline" size="sm" className="w-9" disabled>
            ...
          </Button>,
        )
      }
    }

    // Next page link
    if (currentPage < totalPages) {
      links.push(
        <Link
          key="next"
          href={{
            pathname: "/shop",
            query: { ...searchParams, page: currentPage + 1 },
          }}
          aria-label="Next page"
        >
          <Button variant="outline" size="sm">
            Next
          </Button>
        </Link>,
      )
    }

    return links
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-muted-foreground">
            {totalProducts} {totalProducts === 1 ? "product" : "products"} available
          </p>
        </div>

        {/* Search and sort controls */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <form className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search candles..."
              name="q"
              defaultValue={q}
              aria-label="Search products"
            />
            <Button type="submit">Search</Button>
          </form>

          <Select
            defaultValue={sort || "relevance"}
            onValueChange={(value) => {
              const url = new URL(window.location.href)
              if (value) {
                url.searchParams.set("sort", value)
              } else {
                url.searchParams.delete("sort")
              }
              window.location.href = url.toString()
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category filters sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Categories</h2>
            <div className="flex flex-col space-y-1">
              <Button variant={!category ? "default" : "ghost"} asChild className="justify-start">
                <Link href="/shop">All Categories</Link>
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={category === cat.id ? "default" : "ghost"}
                  asChild
                  className="justify-start"
                >
                  <Link href={`/shop?category=${cat.id}`}>{cat.name}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Price range filter */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Price Range</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="min-price" className="text-sm text-muted-foreground">
                    Min Price
                  </label>
                  <Input
                    type="number"
                    id="min-price"
                    name="minPrice"
                    placeholder="Min"
                    defaultValue={minPrice}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="max-price" className="text-sm text-muted-foreground">
                    Max Price
                  </label>
                  <Input
                    type="number"
                    id="max-price"
                    name="maxPrice"
                    placeholder="Max"
                    defaultValue={maxPrice}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <Button type="submit" size="sm" className="w-full">
                Apply Filter
              </Button>
            </form>
          </div>
        </div>

        {/* Product grid */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-3">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<ProductGridSkeleton count={productsPerPage} />}>
                  {paginatedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 6} // Prioritize loading for first 6 products
                    />
                  ))}
                </Suspense>
              </div>

              {/* Pagination */}
              {totalPages > 1 && <div className="mt-8 flex justify-center gap-2">{getPaginationLinks()}</div>}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-12 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button asChild>
                <Link href="/shop">Clear filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * ProductGridSkeleton component - Loading placeholder for product grid
 *
 * @param count Number of skeleton items to display
 */
function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-background p-2">
          <Skeleton className="aspect-square w-full rounded-md" />
          <div className="pt-3 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-9 w-full mt-2" />
          </div>
        </div>
      ))}
    </>
  )
}

