import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts, type ProductId } from "@/lib/copper/catalog";

// Sample reviews from fictional customers. Every claim matches a feature in
// the catalog. Keep prices out of the text: the page must follow the catalog.
const REVIEWS: {
  productId: ProductId;
  rating: number;
  quote: string;
  name: string;
  place: string;
}[] = [
  {
    productId: "copper-home",
    rating: 5,
    quote:
      "Monsoon Mode paused our sprinklers an hour before the storm rolled in, and Copper reminded me the pool guy was coming Thursday. It's the most useful thing on our kitchen counter.",
    name: "Rosa M.",
    place: "Tempe, AZ",
  },
];

const MAX_RATING = 5;

export function ReviewsSection() {
  const products = getProducts();

  return (
    <section data-testid="reviews" id="reviews" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          What Copper owners say
        </h2>
        <div className="mt-10 space-y-6">
          {REVIEWS.map((review) => {
            const product = products.find((p) => p.id === review.productId);
            return (
              <Card key={review.name} className="text-base">
                <CardContent className="px-6 py-4 sm:px-10 sm:py-6">
                  <figure>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div
                        role="img"
                        aria-label={`Rated ${review.rating} out of ${MAX_RATING} stars`}
                        className="flex gap-1"
                      >
                        {Array.from({ length: MAX_RATING }, (_, i) => (
                          <StarIcon
                            key={i}
                            aria-hidden
                            className={`size-6 ${i < review.rating ? "fill-[#f2c230] text-[#f2c230]" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground bg-muted rounded-full px-3 py-1 text-xs font-medium">
                        Sample review
                      </span>
                    </div>
                    <blockquote className="mt-6 text-xl leading-relaxed font-medium text-balance sm:text-2xl">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="text-muted-foreground mt-6">
                      <span className="text-foreground font-semibold">
                        {review.name}
                      </span>
                      , {review.place}
                      {product && <> · {product.name} owner</>}
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
