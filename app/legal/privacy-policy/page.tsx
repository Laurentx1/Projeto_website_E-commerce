import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy | Candelle",
  description: "Learn about how we collect, use, and protect your personal information.",
}

/**
 * PrivacyPolicyPage component - Displays the company's privacy policy
 */
export default function PrivacyPolicyPage() {
  // Current date for last updated
  const lastUpdated = "March 15, 2023"

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-2">
              At Candelle ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website, make a purchase, or interact with us in any way.
            </p>
            <p className="mt-2">
              Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you
              have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-2">
              We may collect several types of information from and about users of our website, including:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-foreground">Personal Information:</span> Name, email address, postal
                address, phone number, payment information, and any other information you provide when creating an
                account, making a purchase, or contacting us.
              </li>
              <li>
                <span className="font-medium text-foreground">Transaction Information:</span> Details about purchases or
                orders you make through our website.
              </li>
              <li>
                <span className="font-medium text-foreground">Usage Information:</span> Information about how you access
                and use our website, including your IP address, browser type, device information, operating system, and
                the pages you visit.
              </li>
              <li>
                <span className="font-medium text-foreground">Cookies and Similar Technologies:</span> We use cookies
                and similar tracking technologies to track activity on our website and hold certain information to
                enhance your experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-2">We may use the information we collect about you for various purposes, including:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Processing and fulfilling your orders</li>
              <li>Creating and managing your account</li>
              <li>Providing customer support</li>
              <li>Sending transactional emails (order confirmations, shipping updates)</li>
              <li>Sending marketing communications (if you've opted in)</li>
              <li>Improving our website and products</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Protecting against fraudulent or unauthorized transactions</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. How We Share Your Information</h2>
            <p className="mt-2">We may share your personal information with:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-foreground">Service Providers:</span> Third-party vendors who provide
                services on our behalf, such as payment processing, shipping, and marketing.
              </li>
              <li>
                <span className="font-medium text-foreground">Business Partners:</span> Trusted third parties who help
                us operate our business, such as marketing partners or analytics providers.
              </li>
              <li>
                <span className="font-medium text-foreground">Legal Requirements:</span> When required by law or to
                protect our rights, property, or safety, or the rights, property, or safety of others.
              </li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Your Choices</h2>
            <p className="mt-2">You have certain choices about how we use your information:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-foreground">Account Information:</span> You can review and update your
                account information by logging into your account.
              </li>
              <li>
                <span className="font-medium text-foreground">Marketing Communications:</span> You can opt out of
                receiving marketing emails by clicking the "unsubscribe" link in any marketing email we send.
              </li>
              <li>
                <span className="font-medium text-foreground">Cookies:</span> Most web browsers are set to accept
                cookies by default. You can usually choose to set your browser to remove or reject cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Data Security</h2>
            <p className="mt-2">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Children's Privacy</h2>
            <p className="mt-2">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Changes to Our Privacy Policy</h2>
            <p className="mt-2">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
            <p className="mt-2">If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-2">
              <p>Email: privacy@candelle.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>
                Address: 123 Candle Lane
                <br />
                Waxville, CA 90210
                <br />
                United States
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

