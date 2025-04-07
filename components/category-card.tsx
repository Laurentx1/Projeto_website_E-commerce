import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
  className?: string
  priority?: boolean
}

/**
 * CategoryCard component - Displays a category in a card format
 *
 * Features:
 * - Image display with loading state
 * - Hover effects
 * - Link to category page
 * - Responsive design
 *
 * @param category The category to display
 * @param className Optional additional CSS classes
 * @param priority Whether to prioritize image loading
 */
export default function CategoryCard({ category, className, priority = false }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.id}`}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-md",
        className,
      )}
    >
      {/* Category image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
        <Image
          src={category.image || "/placeholder.svg?height=200&width=200"}
          alt={category.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Category details */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-medium">{category.name}</h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2">{category.description}</p>
        <div className="mt-2 flex items-center text-sm font-medium">
          <span className="mr-1">Shop Now</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

