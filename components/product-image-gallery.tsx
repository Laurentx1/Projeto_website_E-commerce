"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
  alt: string
}

/**
 * ProductImageGallery component - Displays product images with thumbnails
 *
 * Features:
 * - Main image display
 * - Thumbnail navigation
 * - Image zoom on hover
 * - Previous/next navigation
 * - Loading states
 * - Responsive design
 *
 * @param images Array of image URLs
 * @param alt Alt text for the images
 */
export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border bg-background">
        <Image
          src="/placeholder.svg"
          alt={alt}
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
          priority
        />
      </div>
    )
  }

  // Navigate to previous image
  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsImageLoaded(false)
  }

  // Navigate to next image
  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsImageLoaded(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-lg border bg-background">
        <div className={cn("transition-opacity duration-300", isImageLoaded ? "opacity-100" : "opacity-0")}>
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={`${alt} - Image ${selectedImage + 1}`}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-all duration-300 hover:scale-105"
            priority
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                selectedImage === index && "ring-2 ring-primary ring-offset-2",
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedImage === index ? "true" : "false"}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

