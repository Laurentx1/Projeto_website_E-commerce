import type { Metadata } from "next"
import ShopPageClient from "./ShopPageClient"

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Shop Our Collection | Candelle",
  description:
    "Browse our collection of handcrafted candles made with 100% natural soy wax, fine fragrance oils, and cotton wicks.",
  keywords: ["candles", "shop", "soy wax", "fragrance", "handcrafted"],
}

// Define search params interface
interface SearchParams {
  category?: string
  q?: string
  sort?: string
  page?: string
  minPrice?: string
  maxPrice?: string
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <ShopPageClient searchParams={searchParams} />
}

