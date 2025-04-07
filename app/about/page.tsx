import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Story</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Crafting premium candles with love and attention to detail since 2015.
        </p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <Image
          src="/placeholder.svg?height=500&width=500"
          alt="Our workshop"
          width={500}
          height={500}
          className="mx-auto rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold">How It All Started</h2>
          <p className="text-muted-foreground">
            Candelle began in a small kitchen with a passion for creating beautiful, natural candles. What started as a
            hobby quickly grew into a beloved brand known for quality and craftsmanship.
          </p>
          <p className="text-muted-foreground">
            Our founder, Emma, was inspired by the transformative power of scent and how it can create atmosphere and
            evoke memories. She began experimenting with different waxes, fragrances, and techniques until she perfected
            her recipes.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to handcraft each candle with the same care and attention to detail that defined our
            earliest creations.
          </p>
        </div>
      </div>

      <div id="process" className="mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Our Process</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Every Candelle product is handcrafted using traditional methods and premium ingredients.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Sourcing",
              description:
                "We carefully select the finest natural ingredients, from 100% soy wax to premium fragrance oils and cotton wicks.",
            },
            {
              title: "Crafting",
              description:
                "Each candle is hand-poured in small batches to ensure quality and consistency in every product.",
            },
            {
              title: "Testing",
              description:
                "We rigorously test our candles for burn time, scent throw, and safety before they reach your home.",
            },
          ].map((step, index) => (
            <div key={index} className="rounded-lg border p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="sustainability" className="mt-24">
        <div className="rounded-lg bg-muted/50 p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Commitment to Sustainability</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              We believe in creating products that are as kind to the planet as they are to your home.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Natural Ingredients",
                description:
                  "We use 100% natural soy wax, which is renewable, biodegradable, and burns cleaner than paraffin.",
              },
              {
                title: "Reusable Containers",
                description:
                  "Our containers are designed to be repurposed after your candle is finished, reducing waste.",
              },
              {
                title: "Eco-Friendly Packaging",
                description: "All our packaging is made from recycled materials and is fully recyclable.",
              },
              {
                title: "Local Production",
                description: "By producing locally, we reduce our carbon footprint and support our community.",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-background p-6">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold">Ready to Experience Candelle?</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Discover our collection of handcrafted candles and bring warmth and ambiance to your home.
        </p>
        <Button asChild className="mt-8">
          <Link href="/shop">Shop Our Collection</Link>
        </Button>
      </div>
    </div>
  )
}

