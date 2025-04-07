import type { Product, Category, Review } from "./types"

/**
 * Product data and related functions
 * In a real application, this would fetch from a database or API
 */

// Mock product data with enhanced details
const products: Product[] = [
  {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    description:
      "A warm and comforting vanilla scent with hints of caramel and bourbon. This luxurious candle creates a cozy atmosphere perfect for relaxing evenings at home. The sweet, familiar scent of vanilla is enhanced with subtle notes of caramel and a touch of bourbon for a sophisticated twist on a classic fragrance.",
    shortDescription: "A warm and comforting vanilla scent with hints of caramel and bourbon.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "classic",
    tags: ["vanilla", "sweet", "cozy"],
    featured: true,
    stock: 15,
    weight: 8,
    dimensions: {
      height: 3.5,
      width: 3,
      depth: 3,
    },
    burnTime: 45,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["vanilla", "caramel", "bourbon"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-03-20T00:00:00Z",
  },
  {
    id: "lavender-fields",
    name: "Lavender Fields",
    description:
      "Calming lavender with notes of bergamot and chamomile for relaxation. This soothing candle helps create a peaceful environment, perfect for unwinding after a long day. The lavender is complemented by subtle hints of bergamot for a touch of brightness and chamomile for added relaxation benefits.",
    shortDescription: "Calming lavender with notes of bergamot and chamomile for relaxation.",
    price: 26.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "relaxation",
    tags: ["lavender", "calming", "sleep"],
    featured: true,
    stock: 12,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 55,
    ingredients: ["100% soy wax", "cotton wick", "essential oil blend"],
    scentNotes: ["lavender", "bergamot", "chamomile"],
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-03-15T00:00:00Z",
  },
  {
    id: "citrus-grove",
    name: "Citrus Grove",
    description:
      "Refreshing blend of orange, lemon, and grapefruit to energize your space. This vibrant candle brings the fresh scent of a citrus orchard into your home. Perfect for kitchens, home offices, or any space where you want an uplifting atmosphere that promotes focus and energy.",
    shortDescription: "Refreshing blend of orange, lemon, and grapefruit to energize your space.",
    price: 22.99,
    originalPrice: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "fresh",
    tags: ["citrus", "energizing", "kitchen"],
    featured: true,
    stock: 20,
    weight: 8,
    dimensions: {
      height: 3.5,
      width: 3,
      depth: 3,
    },
    burnTime: 40,
    ingredients: ["100% soy wax", "cotton wick", "essential oil blend"],
    scentNotes: ["orange", "lemon", "grapefruit", "bergamot"],
    createdAt: "2023-01-25T00:00:00Z",
    updatedAt: "2023-04-01T00:00:00Z",
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description:
      "Fresh sea air with hints of salt and light floral notes. This candle brings the refreshing scent of the ocean into your home. The clean, aquatic fragrance is enhanced with subtle notes of sea salt and light florals for a truly immersive experience that transports you to a coastal retreat.",
    shortDescription: "Fresh sea air with hints of salt and light floral notes.",
    price: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "fresh",
    tags: ["ocean", "fresh", "clean"],
    stock: 18,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 50,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["sea salt", "ocean air", "light florals"],
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "cinnamon-spice",
    name: "Cinnamon Spice",
    description:
      "Warm cinnamon with clove and nutmeg for a cozy atmosphere. This comforting candle fills your home with the nostalgic scent of freshly baked goods and warm spices. Perfect for creating a welcoming environment during the fall and winter months or anytime you want to add warmth to your space.",
    shortDescription: "Warm cinnamon with clove and nutmeg for a cozy atmosphere.",
    price: 23.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "seasonal",
    tags: ["cinnamon", "spice", "fall", "winter"],
    stock: 10,
    weight: 8,
    dimensions: {
      height: 3.5,
      width: 3,
      depth: 3,
    },
    burnTime: 45,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["cinnamon", "clove", "nutmeg", "vanilla"],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-04-05T00:00:00Z",
  },
  {
    id: "eucalyptus-mint",
    name: "Eucalyptus Mint",
    description:
      "Invigorating eucalyptus and mint to refresh your senses. This revitalizing candle combines the clarifying properties of eucalyptus with the cooling effect of mint for an experience that clears the mind and refreshes the senses. Perfect for bathrooms, home spas, or any space where you want to create a clean, refreshing atmosphere.",
    shortDescription: "Invigorating eucalyptus and mint to refresh your senses.",
    price: 27.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "relaxation",
    tags: ["eucalyptus", "mint", "spa", "refreshing"],
    stock: 14,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 55,
    ingredients: ["100% soy wax", "cotton wick", "essential oil blend"],
    scentNotes: ["eucalyptus", "mint", "tea tree"],
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-03-25T00:00:00Z",
  },
  {
    id: "sandalwood-amber",
    name: "Sandalwood Amber",
    description:
      "Rich sandalwood with warm amber and a hint of musk. This sophisticated candle creates a luxurious atmosphere with its complex, woody fragrance. The deep, earthy notes of sandalwood are complemented by the warmth of amber and a subtle hint of musk for a truly indulgent experience.",
    shortDescription: "Rich sandalwood with warm amber and a hint of musk.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "premium",
    tags: ["sandalwood", "amber", "woody", "luxury"],
    stock: 8,
    weight: 12,
    dimensions: {
      height: 4.5,
      width: 4,
      depth: 4,
    },
    burnTime: 65,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["sandalwood", "amber", "musk", "vanilla"],
    createdAt: "2023-02-20T00:00:00Z",
    updatedAt: "2023-04-10T00:00:00Z",
  },
  {
    id: "apple-cider",
    name: "Apple Cider",
    description:
      "Sweet apple with cinnamon and clove, reminiscent of fresh apple cider. This nostalgic candle brings the comforting scent of autumn into your home year-round. The sweet, fruity notes of apple are enhanced with warm spices like cinnamon and clove for a truly cozy experience that evokes memories of fall gatherings.",
    shortDescription: "Sweet apple with cinnamon and clove, reminiscent of fresh apple cider.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "seasonal",
    tags: ["apple", "cider", "fall", "spice"],
    stock: 16,
    weight: 8,
    dimensions: {
      height: 3.5,
      width: 3,
      depth: 3,
    },
    burnTime: 45,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["apple", "cinnamon", "clove", "nutmeg"],
    createdAt: "2023-02-25T00:00:00Z",
    updatedAt: "2023-04-15T00:00:00Z",
  },
  {
    id: "coconut-paradise",
    name: "Coconut Paradise",
    description:
      "Tropical coconut with vanilla and a hint of pineapple. This vacation-inspired candle brings the scent of a tropical paradise into your home. The creamy notes of coconut are complemented by sweet vanilla and a touch of juicy pineapple for an experience that transports you to a sunny beach getaway.",
    shortDescription: "Tropical coconut with vanilla and a hint of pineapple.",
    price: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "fresh",
    tags: ["coconut", "tropical", "summer", "sweet"],
    stock: 15,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 50,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["coconut", "vanilla", "pineapple"],
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-04-20T00:00:00Z",
  },
  {
    id: "linen-breeze",
    name: "Linen Breeze",
    description:
      "Clean, fresh scent of sun-dried linen with subtle floral notes. This crisp candle brings the refreshing scent of freshly laundered linens dried in the sunshine. The clean, airy fragrance is enhanced with subtle floral notes for a truly refreshing experience that makes any space feel instantly cleaner and more inviting.",
    shortDescription: "Clean, fresh scent of sun-dried linen with subtle floral notes.",
    price: 23.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "fresh",
    tags: ["linen", "clean", "fresh", "laundry"],
    stock: 18,
    weight: 8,
    dimensions: {
      height: 3.5,
      width: 3,
      depth: 3,
    },
    burnTime: 45,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["fresh linen", "cotton", "light florals"],
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-04-25T00:00:00Z",
  },
  {
    id: "cedar-pine",
    name: "Cedar & Pine",
    description:
      "Woody cedar with fresh pine and a touch of citrus. This nature-inspired candle brings the refreshing scent of a forest walk into your home. The rich, woody notes of cedar are complemented by the crisp freshness of pine and a subtle hint of citrus for a truly invigorating experience that connects you with the outdoors.",
    shortDescription: "Woody cedar with fresh pine and a touch of citrus.",
    price: 26.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "premium",
    tags: ["cedar", "pine", "woody", "forest"],
    stock: 12,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 55,
    ingredients: ["100% soy wax", "cotton wick", "essential oil blend"],
    scentNotes: ["cedar", "pine", "bergamot"],
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-04-30T00:00:00Z",
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    description:
      "Delicate rose with peony and a hint of jasmine. This floral candle brings the romantic scent of a blooming rose garden into your home. The sweet, delicate notes of rose are enhanced with peony and a touch of jasmine for a truly elegant experience that adds a touch of luxury to any space.",
    shortDescription: "Delicate rose with peony and a hint of jasmine.",
    price: 28.99,
    image: "/placeholder.svg?height=300&width=300",
    additionalImages: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    category: "floral",
    tags: ["rose", "floral", "romantic", "elegant"],
    stock: 10,
    weight: 10,
    dimensions: {
      height: 4,
      width: 3.5,
      depth: 3.5,
    },
    burnTime: 50,
    ingredients: ["100% soy wax", "cotton wick", "premium fragrance oils"],
    scentNotes: ["rose", "peony", "jasmine"],
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-05-05T00:00:00Z",
  },
]

// Mock category data
const categories: Category[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless scents that never go out of style",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
  {
    id: "relaxation",
    name: "Relaxation",
    description: "Calming scents to help you unwind and de-stress",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
  {
    id: "fresh",
    name: "Fresh",
    description: "Clean, invigorating scents for a refreshing atmosphere",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
  {
    id: "seasonal",
    name: "Seasonal",
    description: "Limited edition scents inspired by the seasons",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury scents crafted with the finest ingredients",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "floral",
    name: "Floral",
    description: "Beautiful floral scents to brighten your space",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Mock review data
const reviews: Review[] = [
  {
    id: "review-1",
    productId: "vanilla-dream",
    userId: "user-1",
    userName: "Sarah J.",
    rating: 5,
    title: "Absolutely love this candle!",
    content:
      "This vanilla candle is amazing! The scent is strong but not overwhelming, and it burns evenly. Will definitely purchase again.",
    createdAt: "2023-05-15T00:00:00Z",
    verified: true,
  },
  {
    id: "review-2",
    productId: "vanilla-dream",
    userId: "user-2",
    userName: "Michael T.",
    rating: 4,
    title: "Great scent, burns well",
    content: "Really nice vanilla scent with hints of caramel. Burns cleanly and lasts a long time. Would recommend.",
    createdAt: "2023-04-20T00:00:00Z",
    verified: true,
  },
  {
    id: "review-3",
    productId: "lavender-fields",
    userId: "user-3",
    userName: "Emily R.",
    rating: 5,
    title: "Perfect for relaxation",
    content:
      "This lavender candle is perfect for unwinding after a long day. The scent is authentic and calming. I keep one in my bedroom and bathroom.",
    createdAt: "2023-05-10T00:00:00Z",
    verified: true,
  },
  {
    id: "review-4",
    productId: "citrus-grove",
    userId: "user-4",
    userName: "David K.",
    rating: 5,
    title: "Energizing and fresh",
    content:
      "I love burning this in my home office. The citrus scent is energizing and helps me stay focused during the workday.",
    createdAt: "2023-05-05T00:00:00Z",
    verified: true,
  },
]

/**
 * Get all products from the database
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return products
}

/**
 * Get featured products for homepage display
 * @returns Array of featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

/**
 * Get a specific product by its ID
 * @param id Product ID to find
 * @returns Product object or undefined if not found
 */
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

/**
 * Get all products in a specific category
 * @param category Category ID to filter by
 * @returns Array of products in the category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

/**
 * Search products by name or description
 * @param query Search term
 * @returns Array of matching products
 */
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))),
  )
}

/**
 * Get all product categories
 * @returns Array of all categories
 */
export function getAllCategories(): Category[] {
  return categories
}

/**
 * Get a specific category by its ID
 * @param id Category ID to find
 * @returns Category object or undefined if not found
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

/**
 * Get featured categories for homepage display
 * @returns Array of featured categories
 */
export function getFeaturedCategories(): Category[] {
  return categories.filter((category) => category.featured)
}

/**
 * Get reviews for a specific product
 * @param productId Product ID to get reviews for
 * @returns Array of reviews for the product
 */
export function getProductReviews(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

/**
 * Get the average rating for a product
 * @param productId Product ID to get rating for
 * @returns Average rating (1-5) or null if no reviews
 */
export function getProductAverageRating(productId: string): number | null {
  const productReviews = getProductReviews(productId)

  if (productReviews.length === 0) {
    return null
  }

  const sum = productReviews.reduce((total, review) => total + review.rating, 0)
  return Number.parseFloat((sum / productReviews.length).toFixed(1))
}

/**
 * Get new arrivals (most recently added products)
 * @param limit Number of products to return
 * @returns Array of new arrival products
 */
export function getNewArrivals(limit = 4): Product[] {
  return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
}

/**
 * Get products on sale (with originalPrice higher than current price)
 * @returns Array of products on sale
 */
export function getProductsOnSale(): Product[] {
  return products.filter((product) => product.originalPrice && product.originalPrice > product.price)
}

/**
 * Get related products based on category and tags
 * @param productId Current product ID
 * @param limit Number of related products to return
 * @returns Array of related products
 */
export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const currentProduct = getProductById(productId)

  if (!currentProduct) {
    return []
  }

  // First get products from the same category
  const sameCategory = products.filter((p) => p.id !== productId && p.category === currentProduct.category)

  // If we have enough products from the same category, return those
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  // If we don't have enough from the same category, try to find products with similar tags
  if (currentProduct.tags && currentProduct.tags.length > 0) {
    const similarTags = products.filter(
      (p) =>
        p.id !== productId &&
        p.category !== currentProduct.category &&
        p.tags &&
        p.tags.some((tag) => currentProduct.tags?.includes(tag)),
    )

    // Combine and deduplicate
    const combined = [...sameCategory, ...similarTags]
    const unique = Array.from(new Set(combined.map((p) => p.id))).map((id) => combined.find((p) => p.id === id)!)

    return unique.slice(0, limit)
  }

  // Fallback to random products if we still don't have enough
  return [
    ...sameCategory,
    ...products.filter((p) => p.id !== productId && p.category !== currentProduct.category),
  ].slice(0, limit)
}

