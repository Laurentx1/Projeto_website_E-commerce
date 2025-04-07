import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Candelle",
  description: "Find answers to common questions about our products, shipping, returns, and more.",
}

/**
 * FAQPage component - Displays frequently asked questions
 *
 * Features:
 * - Categorized questions
 * - Expandable answers
 * - Contact section for additional questions
 */
export default function FAQPage() {
  // FAQ categories with questions and answers
  const faqCategories = [
    {
      title: "Products & Materials",
      questions: [
        {
          question: "What are your candles made of?",
          answer:
            "Our candles are made with 100% natural soy wax, premium fragrance oils, and cotton wicks. We use high-quality ingredients to ensure a clean, long-lasting burn with excellent scent throw.",
        },
        {
          question: "How long do your candles burn?",
          answer:
            "Our 8oz candles burn for approximately 40-50 hours, while our 12oz candles burn for 60-70 hours. Burn time can vary slightly depending on how the candle is used and the environment it's in.",
        },
        {
          question: "Are your candles vegan and cruelty-free?",
          answer:
            "Yes, all our candles are 100% vegan and cruelty-free. We never test on animals and don't use any animal-derived ingredients in our products.",
        },
        {
          question: "Do your candles contain any harmful chemicals?",
          answer:
            "No, our candles are made without paraffin, phthalates, parabens, or other harmful chemicals. We prioritize clean ingredients that are safe for your home and family.",
        },
        {
          question: "How should I care for my candle?",
          answer:
            "For the first burn, allow the wax to melt to the edges of the container (about 2-3 hours) to prevent tunneling. Always trim the wick to 1/4 inch before lighting, keep away from drafts, and never burn for more than 4 hours at a time. Never leave a burning candle unattended.",
        },
      ],
    },
    {
      title: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Domestic orders typically ship within 1-3 business days and arrive within 3-7 business days, depending on your location. International shipping can take 7-21 business days, depending on the destination country and customs processing.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes, we offer free standard shipping on all domestic orders over $50. Orders under $50 have a flat shipping rate of $5.99.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to select international destinations. International shipping rates vary by location and will be calculated at checkout.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes, once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Mercado Pago. All transactions are securely processed.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unused, unopened items within 30 days for a full refund of the purchase price (excluding shipping costs).",
        },
        {
          question: "What if my order arrives damaged?",
          answer:
            "If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damaged items and packaging. We'll arrange a replacement or refund as soon as possible.",
        },
        {
          question: "Can I exchange a product?",
          answer:
            "Yes, we're happy to exchange products within 30 days of purchase. Please contact our customer service team to arrange an exchange.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, please email us at returns@candelle.com with your order number and reason for return. We'll provide you with a return shipping label and instructions.",
        },
      ],
    },
    {
      title: "Account & Subscriptions",
      questions: [
        {
          question: "Do I need an account to make a purchase?",
          answer:
            "No, you can check out as a guest. However, creating an account allows you to track orders, save your shipping information, and join our rewards program.",
        },
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking on the 'Account' icon in the top navigation and selecting 'Create Account', or during the checkout process.",
        },
        {
          question: "Do you offer a subscription service?",
          answer:
            "Yes, we offer a monthly subscription service where you can receive a new candle each month at a discounted price. You can customize your scent preferences and skip or cancel anytime.",
        },
        {
          question: "How do I manage my subscription?",
          answer:
            "You can manage your subscription by logging into your account and navigating to the 'Subscriptions' section. There, you can change scents, skip a month, or cancel your subscription.",
        },
      ],
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        <div className="mt-16 rounded-lg border bg-muted/20 p-8 text-center">
          <h2 className="text-2xl font-bold">Still Have Questions?</h2>
          <p className="mt-2 text-muted-foreground">
            We're here to help. Contact our customer support team for assistance.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="mailto:hello@candelle.com">Email Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

