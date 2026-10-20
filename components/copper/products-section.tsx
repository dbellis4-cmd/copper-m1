import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

// The cutouts are square PNGs on transparent backgrounds.
const CUTOUT_SIZE = 1254;

// The catalog names each finish; the swatch shows it in the matching brand
// color. A finish not listed here gets a plain swatch.
const SWATCHES: Record<string, string> = {
  "Polished Copper": "bg-[#b87333]",
  "Brushed Copper": "bg-[#b87333]",
  "Patina Teal": "bg-[#4a8c82]",
  "Desert Sand": "bg-[#efe3d0]",
  "Night Sky": "bg-[#1c2333]",
};

// One card per catalog product: cutout, finishes, name, price and features.
export function ProductsSection() {
  const products = getProducts();

  return (
    <section data-testid="products" id="products" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Two devices, one Copper
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Card
              key={product.id}
              data-testid="product-card"
              data-product={product.id}
              className="gap-6 pt-0 text-base"
            >
              <div className="bg-secondary flex justify-center px-6 py-8">
                <Image
                  src={product.cutout}
                  alt={`${product.name} ${product.type} in ${product.colors[0]}`}
                  width={CUTOUT_SIZE}
                  height={CUTOUT_SIZE}
                  sizes="(min-width: 768px) 240px, 60vw"
                  className="h-auto w-3/5 max-w-60"
                />
              </div>
              <CardHeader>
                <ul className="text-muted-foreground mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {product.colors.map((color) => (
                    <li key={color} className="flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={`ring-foreground/20 size-3.5 rounded-full ring-1 ${SWATCHES[color] ?? "bg-muted"}`}
                      />
                      {color}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-primary text-2xl font-bold">
                    {formatUsd(product.priceUsd)}
                  </p>
                </div>
                <p className="text-muted-foreground">{product.type}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}.</span>{" "}
                      <span className="text-muted-foreground">
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
