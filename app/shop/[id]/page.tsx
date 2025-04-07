import { notFound } from "next/navigation"
import { Star, Truck, RotateCcw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getProductById, getRelatedProducts, getProductAverageRating, getProductReviews } from "@/lib/products"
import ProductCard from "@/components/product-card"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductImageGallery from "@/components/product-image-gallery"
import ProductReviews from "@/components/product-reviews"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Heart } from "lucide-react"

/**
 * ProductPage component - Displays detailed information about a product
 *
 * Features:
 * - Product image gallery
 * - Product details and pricing
 * - Add to cart functionality
 * - Product tabs (description, details, reviews)
 * - Related products
 *
 * @param params Route parameters containing product ID
 */
export default function ProductPage({ params }: { params: { id: string } }) {
  // Get product data
  const product = getProductById(params.id)

  // If product not found, show 404
  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = getRelatedProducts(product.id, 4)

  // Get product rating
  const rating = getProductAverageRating(product.id)
  const reviewCount = getProductReviews(product.id).length

  // Calculate discount percentage if product is on sale
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  // Prepare image array for gallery
  const images = product.additionalImages ? [product.image, ...product.additionalImages] : [product.image]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      {/* Product main section */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product images */}
        <ProductImageGallery images={images} alt={product.name} />

        {/* Product details */}
        <div className="flex flex-col gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop">Shop</Link>
            <span className="mx-2">/</span>
            <Link href={`/shop?category=${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {rating} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <>
                  <p className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                  <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                </>
              )}
            </div>
          </div>

          {/* Short description */}
          <p className="text-muted-foreground">{product.shortDescription || product.description}</p>

          {/* Product meta */}
          <div className="space-y-4 py-4">
            {/* Availability */}
            <div className="flex items-center gap-2">
              <div className="font-medium">Availability:</div>
              {product.stock > 0 ? (
                <div className="text-green-600">In Stock ({product.stock} available)</div>
              ) : (
                <div className="text-red-600">Out of Stock</div>
              )}
            </div>

            {/* Weight */}
            {product.weight && (
              <div className="flex items-center gap-2">
                <div className="font-medium">Weight:</div>
                <div>{product.weight} oz</div>
              </div>
            )}

            {/* Burn time */}
            {product.burnTime && (
              <div className="flex items-center gap-2">
                <div className="font-medium">Burn Time:</div>
                <div>Approximately {product.burnTime} hours</div>
              </div>
            )}

            {/* Scent notes */}
            {product.scentNotes && product.scentNotes.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="font-medium">Scent Notes:</div>
                <div>{product.scentNotes.join(", ")}</div>
              </div>
            )}
          </div>

          {/* Add to cart */}
          <div className="flex flex-col gap-4 pt-4">
            <AddToCartButton product={product} />
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>

          {/* Shipping info */}
          <div className="mt-8 space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Handcrafted with natural ingredients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b pb-0">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details & Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>

              {/* Additional description content */}
              <h3>About {product.name}</h3>
              <p>
                Our {product.name} candle is carefully handcrafted in small batches to ensure the highest quality. Each
                candle is made with 100% natural soy wax, which burns cleaner and longer than traditional paraffin wax.
                The cotton wick is lead-free and zinc-free, providing a clean, even burn.
              </p>

              <h3>How to Use</h3>
              <p>
                For the first burn, allow the wax to melt to the edges of the container (about 2-3 hours) to prevent
                tunneling. Trim the wick to 1/4 inch before each use to prevent smoking and ensure an even burn. Never
                leave a burning candle unattended and keep away from drafts, children, and pets.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="details" className="pt-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Product specifications */}
              <div>
                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">{product.weight} oz</span>
                  </li>
                  {product.dimensions && (
                    <li className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">
                        {product.dimensions.height}" × {product.dimensions.width}" × {product.dimensions.depth}"
                      </span>
                    </li>
                  )}
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Burn Time</span>
                    <span className="font-medium">Approximately {product.burnTime} hours</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Wax Type</span>
                    <span className="font-medium">100% Natural Soy Wax</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Wick Type</span>
                    <span className="font-medium">Cotton Wick</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Scent Family</span>
                    <span className="font-medium">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-medium mb-4">Ingredients</h3>
                <p className="text-muted-foreground mb-4">
                  We believe in transparency and using only the highest quality ingredients in our candles.
                </p>

                <ul className="space-y-2">
                  {product.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-medium mt-6 mb-4">Scent Notes</h3>
                {product.scentNotes && product.scentNotes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.scentNotes.map((note, index) => (
                      <Badge key={index} variant="outline" className="capitalize">
                        {note}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No scent notes specified for this product.</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

