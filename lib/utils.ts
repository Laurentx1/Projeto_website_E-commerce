import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility functions for the Candelle e-commerce platform
 */

/**
 * Combines class names with Tailwind CSS classes
 * Uses clsx for conditional class merging and tailwind-merge to handle Tailwind-specific conflicts
 *
 * @param inputs - Class values to be merged (strings, objects, arrays, etc.)
 * @returns Merged class string with resolved Tailwind conflicts
 *
 * @example
 * // Basic usage
 * cn("px-4 py-2", "bg-blue-500") // "px-4 py-2 bg-blue-500"
 *
 * @example
 * // With conditions
 * cn("px-4", isActive && "bg-blue-500") // "px-4 bg-blue-500" or "px-4"
 *
 * @example
 * // Resolving conflicts
 * cn("px-4", "px-6") // "px-6" (later classes override earlier ones)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price value to a currency string
 *
 * @param price - The price value to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted price string
 *
 * @example
 * formatPrice(29.99) // "$29.99"
 * formatPrice(29.99, 'EUR', 'de-DE') // "29,99 €"
 */
export function formatPrice(price: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price)
}

/**
 * Truncates text to a specified length and adds ellipsis
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 100)
 * @returns Truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a long description", 10) // "This is a..."
 */
export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Generates a slug from a string (for URLs)
 *
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Vanilla Dream Candle") // "vanilla-dream-candle"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

/**
 * Debounces a function call
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns Debounced function
 *
 * @example
 * // Usage with search input
 * const debouncedSearch = debounce((query) => {
 *   searchProducts(query);
 * }, 500);
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Gets a random item from an array
 *
 * @param array - The array to get a random item from
 * @returns A random item from the array
 *
 * @example
 * getRandomItem([1, 2, 3, 4, 5]) // Could return any number from the array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Checks if the code is running on the client side
 * Useful for conditionally running code that requires browser APIs
 *
 * @returns Boolean indicating if code is running in browser
 *
 * @example
 * if (isClient()) {
 *   // Access localStorage, window, etc.
 * }
 */
export function isClient(): boolean {
  return typeof window !== "undefined"
}

/**
 * Safely parses JSON with error handling
 *
 * @param json - The JSON string to parse
 * @param fallback - Fallback value if parsing fails (default: null)
 * @returns Parsed object or fallback value
 *
 * @example
 * const data = safeJsonParse(localStorage.getItem('cart'), [])
 */
export function safeJsonParse<T>(json: string | null, fallback: T = null as unknown as T): T {
  if (!json) return fallback

  try {
    return JSON.parse(json) as T
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return fallback
  }
}

