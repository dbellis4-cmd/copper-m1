import Image from "next/image";
import { getProducts } from "@/lib/copper/catalog";

// Size, alt text and caption for each lifestyle photo the catalog lists.
// A photo not listed here still shows, with text built from the product name.
const PHOTOS: Record<
  string,
  { width: number; height: number; alt: string; caption: string }
> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
    alt: "Copper Home smart speaker showing 4:25 and 92° on a stone kitchen counter, with saguaros and mountains at sunset through the window",
    caption:
      "Copper Home keeps the house running, from the sprinklers to the storm alerts.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    width: 1672,
    height: 941,
    alt: "Copper Notes recorder standing on a sunlit stone counter beside its round charging base",
    caption:
      "Copper Notes is small enough to sit anywhere, and ready when you are.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
    alt: "A man writing in a notebook at a café table, with Copper Notes clipped to his shirt pocket and its amber ring lit",
    caption:
      "Clip it on, and the amber ring shows everyone when Copper Notes is recording.",
  },
};

// Lifestyle photos in alternating photo/caption rows (stacked on phones).
export function ShowcaseSection() {
  const photos = getProducts().flatMap((product) =>
    product.lifestyle.map((src) => ({
      src,
      productName: product.name,
      ...(PHOTOS[src] ?? {
        width: 1600,
        height: 900,
        alt: `${product.name} ${product.type} at home in Arizona`,
        caption: `${product.name}, at home in Arizona.`,
      }),
    })),
  );

  return (
    <section
      data-testid="showcase"
      id="showcase"
      className="bg-secondary text-secondary-foreground py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          At home in Arizona
        </h2>
        <div className="mt-10 space-y-12 md:space-y-16">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="grid items-center gap-6 md:grid-cols-5 md:gap-10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 60vw, 100vw"
                className={`h-auto w-full rounded-2xl shadow-sm md:col-span-3 ${index % 2 === 1 ? "md:order-last" : ""}`}
              />
              <figcaption className="md:col-span-2">
                <p className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {photo.productName}
                </p>
                <p className="mt-2 text-xl font-medium text-balance sm:text-2xl">
                  {photo.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
