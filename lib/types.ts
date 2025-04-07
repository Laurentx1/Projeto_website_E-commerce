/**
 * Core data types for the Candelle e-commerce platform
 * These types define the structure of our main data entities
 */

// Product type - represents a candle product in our store
export interface Product {
  id: string // Unique identifier for the product
  name: string // Product name
  description: string // Full product description
  shortDescription?: string // Optional shorter description for cards
  price: number // Current price in USD
  originalPrice?: number // Optional original price for sale items
  image: string // Main product image URL
  additionalImages?: string[] // Optional additional product images
  category: string // Product category ID
  tags?: string[] // Optional tags for filtering/search
  featured?: boolean // Whether product should be featured on homepage
  stock: number // Current inventory count
  weight?: number // Product weight in ounces
  dimensions?: {
    // Optional product dimensions
    height: number
    width: number
    depth: number
  }
  burnTime?: number // Approximate burn time in hours
  ingredients?: string[] // List of ingredients
  scentNotes?: string[] // Fragrance notes
  createdAt: string // When the product was first added
  updatedAt: string // When the product was last updated
}

// Category type - represents a product category
export interface Category {
  id: string // Unique identifier for the category
  name: string // Display name
  description: string // Category description
  image?: string // Optional category image
  parentId?: string // Optional parent category for hierarchical categories
  featured?: boolean // Whether to feature this category
}

// User type - represents a customer account
export interface User {
  id: string // Unique identifier for the user
  name: string // User's full name
  email: string // User's email address (used for login)
  phone?: string // Optional phone number
  addresses?: Address[] // User's saved addresses
  defaultAddressId?: string // ID of default address
  createdAt: string // When the account was created
  lastLogin?: string // Last login timestamp
  wishlist?: string[] // Array of product IDs in wishlist
}

// Address type - represents a shipping/billing address
export interface Address {
  id: string // Unique identifier for the address
  name: string // Name associated with this address
  street: string // Street address
  apartment?: string // Optional apartment/suite number
  city: string // City
  state: string // State/province
  zip: string // Postal/ZIP code
  country: string // Country
  isDefault?: boolean // Whether this is the default address
  phone?: string // Phone number for this address
}

// Order type - represents a customer order
export interface Order {
  id: string // Unique order identifier
  userId: string // ID of user who placed the order
  items: OrderItem[] // Items in the order
  subtotal: number // Order subtotal before tax/shipping
  tax: number // Tax amount
  shipping: number // Shipping cost
  discount?: number // Optional discount amount
  total: number // Total order amount
  status: OrderStatus // Current order status
  createdAt: string // When the order was placed
  updatedAt: string // When the order was last updated
  shippingAddress: Address // Shipping address
  billingAddress?: Address // Optional billing address if different
  paymentMethod: string // Payment method used
  paymentId?: string // Optional payment processor ID
  trackingNumber?: string // Optional shipping tracking number
  notes?: string // Optional order notes
}

// Order item - represents a product in an order
export interface OrderItem {
  productId: string // ID of the product
  productName: string // Name of the product (snapshot at time of order)
  quantity: number // Quantity ordered
  price: number // Price per unit (snapshot at time of order)
  subtotal: number // Total for this line item
  image?: string // Product image
}

// Order status - possible states for an order
export type OrderStatus =
  | "pending" // Order created but not confirmed
  | "processing" // Order confirmed, payment received
  | "shipped" // Order has been shipped
  | "delivered" // Order has been delivered
  | "cancelled" // Order was cancelled
  | "refunded" // Order was refunded

// Review type - represents a product review
export interface Review {
  id: string // Unique review identifier
  productId: string // ID of the reviewed product
  userId: string // ID of the user who wrote the review
  userName: string // Name of the reviewer
  rating: number // Rating (1-5)
  title: string // Review title
  content: string // Review content
  createdAt: string // When the review was created
  verified: boolean // Whether this is a verified purchase
}

// Cart item - represents a product in the shopping cart
export interface CartItem {
  product: Product // The product
  quantity: number // Quantity in cart
}

// Coupon type - represents a discount coupon
export interface Coupon {
  code: string // Coupon code
  description: string // Description of the coupon
  discountType: "percentage" | "fixed" // Type of discount
  discountValue: number // Amount of discount (percentage or fixed amount)
  minimumPurchase?: number // Optional minimum purchase amount
  expiryDate?: string // Optional expiry date
  usageLimit?: number // Optional maximum number of uses
  usageCount: number // Current number of uses
  productIds?: string[] // Optional specific products this applies to
  categoryIds?: string[] // Optional specific categories this applies to
}

