"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import type { Product, CartItem } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import { safeJsonParse, isClient } from "@/lib/utils"

/**
 * Cart Context - Provides shopping cart functionality throughout the application
 *
 * This context manages:
 * - Adding/removing items from cart
 * - Updating quantities
 * - Calculating totals
 * - Persisting cart data in localStorage
 */

// Storage key for cart data in localStorage
const CART_STORAGE_KEY = "candelle-cart"

// Interface defining the cart context shape
interface CartContextType {
  cartItems: CartItem[] // Items in the cart
  addToCart: (product: Product, quantity?: number) => void // Add a product to cart
  removeFromCart: (productId: string) => void // Remove a product from cart
  updateQuantity: (productId: string, quantity: number) => void // Update quantity of a product
  clearCart: () => void // Empty the cart
  subtotal: number // Cart subtotal before tax/shipping
  itemCount: number // Total number of items in cart
  isInCart: (productId: string) => boolean // Check if product is in cart
  getItemQuantity: (productId: string) => number // Get quantity of a product in cart
}

// Create the context with undefined initial value
const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * CartProvider component - Wraps the application to provide cart functionality
 * @param children React children components
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // State to store cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage when component mounts (client-side only)
  useEffect(() => {
    if (!isClient()) return

    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    setCartItems(safeJsonParse<CartItem[]>(savedCart, []))
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isClient() || cartItems.length === 0) return

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  /**
   * Add a product to the cart
   * @param product Product to add
   * @param quantity Quantity to add (defaults to 1)
   */
  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      // If product already exists in cart, update quantity
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity

        // Check if we have enough stock
        if (newQuantity > product.stock) {
          toast({
            title: "Maximum stock reached",
            description: `Sorry, we only have ${product.stock} units of this item in stock.`,
            variant: "destructive",
          })
          return prevItems.map((item) => (item.product.id === product.id ? { ...item, quantity: product.stock } : item))
        }

        toast({
          title: "Cart updated",
          description: `Updated ${product.name} quantity to ${newQuantity}.`,
        })

        return prevItems.map((item) => (item.product.id === product.id ? { ...item, quantity: newQuantity } : item))
      }
      // Otherwise add new item to cart
      else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        })

        return [...prevItems, { product, quantity }]
      }
    })
  }, [])

  /**
   * Remove a product from the cart
   * @param productId ID of product to remove
   */
  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.product.id === productId)
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.product.name} has been removed from your cart.`,
        })
      }
      return prevItems.filter((item) => item.product.id !== productId)
    })
  }, [])

  /**
   * Update the quantity of a product in the cart
   * @param productId ID of product to update
   * @param quantity New quantity (removes item if <= 0)
   */
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      setCartItems((prevItems) => {
        const item = prevItems.find((item) => item.product.id === productId)

        // Check if we have enough stock
        if (item && quantity > item.product.stock) {
          toast({
            title: "Maximum stock reached",
            description: `Sorry, we only have ${item.product.stock} units of this item in stock.`,
            variant: "destructive",
          })
          return prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity: item.product.stock } : item,
          )
        }

        return prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      })
    },
    [removeFromCart],
  )

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback(() => {
    setCartItems([])
    if (isClient()) {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }, [])

  /**
   * Calculate the subtotal of all items in the cart
   */
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  /**
   * Calculate the total number of items in the cart
   */
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  /**
   * Check if a product is already in the cart
   * @param productId ID of product to check
   * @returns boolean indicating if product is in cart
   */
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cartItems.some((item) => item.product.id === productId)
    },
    [cartItems],
  )

  /**
   * Get the quantity of a product in the cart
   * @param productId ID of product to check
   * @returns quantity of product in cart (0 if not in cart)
   */
  const getItemQuantity = useCallback(
    (productId: string): number => {
      const item = cartItems.find((item) => item.product.id === productId)
      return item ? item.quantity : 0
    },
    [cartItems],
  )

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isInCart,
    getItemQuantity,
  }

  // Provide the cart context to children components
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

/**
 * Custom hook to use the cart context
 * @returns Cart context
 * @throws Error if used outside of CartProvider
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

