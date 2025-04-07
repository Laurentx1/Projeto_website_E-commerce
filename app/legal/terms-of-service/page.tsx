import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service | Candelle",
  description: "Read our terms of service and conditions for using our website and purchasing our products.",
}

/**
 * TermsOfServicePage component - Displays the company's terms of service
 */
export default function TermsOfServicePage() {
  // Current date for last updated
  const lastUpdated = "March 15, 2023"

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-2">
              Welcome to Candelle. These Terms of Service ("Terms") govern your access to and use of our website,
              products, and services. By accessing or using our website, you agree to be bound by these Terms and our
              Privacy Policy.
            </p>
            <p className="mt-2">
              Please read these Terms carefully before using our website. If you do not agree to all the terms and
              conditions of this agreement, you may not access or use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Account Registration</h2>
            <p className="mt-2">
              To access certain features of our website, you may be required to register for an account. When you
              register, you agree to provide accurate, current, and complete information and to update this information
              to maintain its accuracy.
            </p>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account
              or any other breach of security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Products and Purchases</h2>
            <p className="mt-2">
              All product descriptions, including prices, are subject to change at any time without notice. We reserve
              the right to limit the quantity of items purchased and to discontinue any product at any time.
            </p>
            <p className="mt-2">
              When you place an order, you offer to purchase the products at the prices and quantities indicated. We
              reserve the right to accept or decline your order for any reason, including product availability, errors
              in product or pricing information, or problems with your account.
            </p>
            <p className="mt-2">
              All prices are displayed in USD and do not include taxes or shipping fees, which will be added at
              checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Shipping and Delivery</h2>
            <p className="mt-2">
              We ship to the address you provide at checkout. You are responsible for ensuring the accuracy of your
              shipping information. We are not responsible for orders shipped to an incorrect address provided by the
              customer.
            </p>
            <p className="mt-2">
              Delivery times are estimates and not guaranteed. Factors outside our control, such as carrier delays or
              customs processing for international shipments, may affect delivery times.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Returns and Refunds</h2>
            <p className="mt-2">
              We offer a 30-day satisfaction guarantee on all products. If you are not completely satisfied with your
              purchase, you may return unused, unopened items within 30 days for a full refund of the purchase price
              (excluding shipping costs).
            </p>
            <p className="mt-2">
              To initiate a return, please contact our customer service team. Return shipping costs are the
              responsibility of the customer unless the return is due to our error or a defective product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p className="mt-2">
              All content on our website, including text, graphics, logos, images, product descriptions, and software,
              is the property of Candelle or our content suppliers and is protected by United States and international
              copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-2">
              You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from,
              translate, modify, reverse-engineer, disassemble, decompile, or otherwise exploit our website or any
              portion of it without our explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. User Conduct</h2>
            <p className="mt-2">You agree not to use our website to:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Interfere with the operation of our website</li>
              <li>Collect or track personal information of other users</li>
              <li>Engage in any activity that could damage, disable, or impair our servers or networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p className="mt-2">
              OUR WEBSITE AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-2">
              WE DO NOT WARRANT THAT OUR WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
              THAT OUR WEBSITE OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p className="mt-2">
              IN NO EVENT SHALL CANDELLE, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY
              DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY
              (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
              WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF OUR WEBSITE, (III) ANY UNAUTHORIZED ACCESS TO OR USE
              OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN,
              (IV) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR WEBSITE, (V) ANY BUGS, VIRUSES, TROJAN
              HORSES, OR THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR WEBSITE BY ANY THIRD PARTY, AND/OR (VI)
              ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR
              USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE WEBSITE, WHETHER
              BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY IS ADVISED OF
              THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the
              new Terms on this page and updating the "Last Updated" date. Your continued use of our website after any
              such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
            <p className="mt-2">If you have any questions about these Terms, please contact us at:</p>
            <div className="mt-2">
              <p>Email: legal@candelle.com</p>
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

