import { Hero } from "@/components/copper/hero";
import { PlusPricingSection } from "@/components/copper/plus-pricing-section";
import { PrivacySection } from "@/components/copper/privacy-section";
import { ProductsSection } from "@/components/copper/products-section";
import { ReviewsSection } from "@/components/copper/reviews-section";
import { ShowcaseSection } from "@/components/copper/showcase-section";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProductsSection />
        <ShowcaseSection />
        <ReviewsSection />
        <PlusPricingSection />
        <PrivacySection />
      </main>
      <SiteFooter />
    </>
  );
}
