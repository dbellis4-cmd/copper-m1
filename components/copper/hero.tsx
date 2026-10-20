import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/copper/catalog";

// The cutouts are square PNGs on transparent backgrounds.
const CUTOUT_SIZE = 1254;

// Headline and tagline on one side, the two product cutouts on the other
// (stacked on phones). Image paths and alt text come from the catalog.
export function Hero() {
  const products = getProducts();

  return (
    <section
      data-testid="hero"
      id="top"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Meet Copper: your AI at home and on the go
          </h1>
          <p className="text-lg sm:text-xl">
            From raw ideas to refined answers.
          </p>
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <a href="#products">See products</a>
          </Button>
        </div>
        <div className="grid grid-cols-2 items-end gap-4">
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={`${product.name} ${product.type} in ${product.colors[0]}`}
              width={CUTOUT_SIZE}
              height={CUTOUT_SIZE}
              sizes="(min-width: 768px) 240px, 45vw"
              preload
              className="h-auto w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
