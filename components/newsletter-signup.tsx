"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Loader2 } from "lucide-react"

/**
 * NewsletterSignup component - Enhanced email newsletter subscription form
 *
 * Features:
 * - Modern, visually appealing design
 * - Email validation with error handling
 * - Loading state with animation
 * - Success feedback
 * - Responsive layout
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic email validation
    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Call the API route
    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false)
        setEmail("")

        if (data.success) {
          toast({
            title: "Thank you for subscribing!",
            description: "You've been added to our newsletter list. Check your inbox for a special 10% off coupon.",
          })
        } else {
          setError(data.message || "Something went wrong. Please try again.")
        }
      })
      .catch(() => {
        setIsSubmitting(false)
        setError("Connection error. Please try again later.")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            className={`pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isSubmitting}
            aria-label="Email address"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "newsletter-error" : undefined}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="relative overflow-hidden group">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </form>
  )
}

