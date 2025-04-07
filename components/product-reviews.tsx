"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, User } from "lucide-react"
import { getProductReviews, getProductAverageRating } from "@/lib/products"
import { cn } from "@/lib/utils"
import type { Review } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface ProductReviewsProps {
  productId: string
}

/**
 * ProductReviews component - Displays and allows submission of product reviews
 *
 * Features:
 * - Review listing with pagination
 * - Review submission form
 * - Star rating display and input
 * - Review statistics
 * - Form validation
 *
 * @param productId ID of the product to show reviews for
 */
export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")
  const [reviewName, setReviewName] = useState("")
  const [reviewEmail, setReviewEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Get product reviews and average rating
  const reviews = getProductReviews(productId)
  const averageRating = getProductAverageRating(productId)

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 5 stars to 1 star
  reviews.forEach((review) => {
    ratingCounts[5 - review.rating]++
  })

  // Validate form fields
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!reviewTitle.trim()) {
      errors.title = "Review title is required"
    }

    if (!reviewContent.trim()) {
      errors.content = "Review content is required"
    }

    if (!reviewName.trim()) {
      errors.name = "Your name is required"
    }

    if (!reviewEmail.trim()) {
      errors.email = "Your email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(reviewEmail)) {
      errors.email = "Please enter a valid email address"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowForm(false)
      setReviewTitle("")
      setReviewContent("")
      setReviewName("")
      setReviewEmail("")
      setRating(5)
      setFormErrors({})

      toast({
        title: "Review submitted",
        description: "Thank you for your review! It will be published after moderation.",
      })
    }, 1000)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Rating summary */}
        <div className="md:w-1/3 space-y-4">
          <h3 className="text-xl font-medium">Customer Reviews</h3>

          {reviews.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= Math.round(averageRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{averageRating} out of 5</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>

              {/* Rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[5 - star]
                  const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0

                  return (
                    <div key={star} className="flex items-center gap-2">
                      <div className="flex items-center text-sm">
                        {star} <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground w-10">
                        {count} ({percentage}%)
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          )}

          <Button onClick={() => setShowForm(!showForm)} className="w-full">
            {showForm ? "Cancel Review" : "Write a Review"}
          </Button>
        </div>

        {/* Review form or review list */}
        <div className="md:w-2/3">
          {showForm ? (
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating input */}
                <div className="space-y-2">
                  <Label htmlFor="rating">Your Rating</Label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            (hoveredRating ? star <= hoveredRating : star <= rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review title */}
                <div className="space-y-2">
                  <Label htmlFor="review-title">Review Title</Label>
                  <Input
                    id="review-title"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    required
                    className={formErrors.title ? "border-red-500" : ""}
                  />
                  {formErrors.title && <p className="text-xs text-red-500">{formErrors.title}</p>}
                </div>

                {/* Review content */}
                <div className="space-y-2">
                  <Label htmlFor="review-content">Your Review</Label>
                  <Textarea
                    id="review-content"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="What did you like or dislike about this product?"
                    rows={5}
                    required
                    className={formErrors.content ? "border-red-500" : ""}
                  />
                  {formErrors.content && <p className="text-xs text-red-500">{formErrors.content}</p>}
                </div>

                {/* Reviewer info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="review-name">Your Name</Label>
                    <Input
                      id="review-name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-email">Your Email</Label>
                    <Input
                      id="review-email"
                      type="email"
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{reviews.length > 0 ? "Customer Reviews" : "No Reviews Yet"}</h3>

              {/* Review list */}
              {reviews.map((review: Review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">{review.title}</h4>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {review.userName}
                    </div>
                    <span>•</span>
                    <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
                    {review.verified && (
                      <>
                        <span>•</span>
                        <span className="text-green-600">Verified Purchase</span>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-sm">{review.content}</p>
                </div>
              ))}

              {reviews.length > 0 && (
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

