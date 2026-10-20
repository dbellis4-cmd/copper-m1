import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getProducts,
} from "@/lib/copper/catalog";

// Imports the section fresh, so a catalog mock set up before it applies.
async function renderProducts() {
  vi.resetModules();
  const { ProductsSection } =
    await import("@/components/copper/products-section");
  return render(<ProductsSection />);
}

afterEach(() => {
  cleanup();
  vi.doUnmock("@/lib/copper/catalog");
});

describe("ProductsSection", () => {
  it("shows a card per product with its name, price, finishes and features", async () => {
    const { container } = await renderProducts();
    for (const product of getProducts()) {
      const card = container.querySelector<HTMLElement>(
        `[data-testid="product-card"][data-product="${product.id}"]`,
      );
      expect(card, product.id).not.toBeNull();
      const text = card!.textContent ?? "";
      expect(text).toContain(product.name);
      expect(text).toContain(formatUsd(product.priceUsd));
      for (const color of product.colors) expect(text).toContain(color);
      expect(product.features).toHaveLength(3);
      for (const feature of product.features) {
        expect(text).toContain(feature.name);
        expect(text).toContain(feature.description);
      }
      expect(within(card!).getByRole("img").getAttribute("alt")).toContain(
        product.name,
      );
    }
  });

  it("follows the catalog when a price changes", async () => {
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual =
        await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getProducts: () =>
          actual.getProducts().map((p) => ({ ...p, priceUsd: p.priceUsd + 1 })),
      };
    });
    const { container } = await renderProducts();
    for (const product of getProducts()) {
      expect(container.textContent).toContain(formatUsd(product.priceUsd + 1));
      expect(container.textContent).not.toContain(formatUsd(product.priceUsd));
    }
  });
});

describe("ShowcaseSection", () => {
  it("shows every catalog lifestyle photo with a caption and descriptive alt text", async () => {
    const { ShowcaseSection } =
      await import("@/components/copper/showcase-section");
    const { container } = render(<ShowcaseSection />);
    const figures = [...container.querySelectorAll("figure")];
    const photos = getProducts().flatMap((p) =>
      p.lifestyle.map((src) => ({ src, name: p.name })),
    );
    expect(figures).toHaveLength(photos.length);
    for (const [i, photo] of photos.entries()) {
      const img = within(figures[i]).getByRole("img");
      expect(img.getAttribute("src")).toContain(encodeURIComponent(photo.src));
      const alt = img.getAttribute("alt") ?? "";
      expect(alt).toContain(photo.name);
      expect(alt).not.toMatch(/\.png|^image$/i);
      const caption = figures[i].querySelector("figcaption")?.textContent ?? "";
      expect(caption).toContain(photo.name);
      expect(caption).not.toMatch(/never\s+record/i);
    }
  });
});

describe("PlusPricingSection", () => {
  async function renderPricing() {
    vi.resetModules();
    const { PlusPricingSection } =
      await import("@/components/copper/plus-pricing-section");
    return render(<PlusPricingSection />);
  }

  const card = (container: HTMLElement, id: string) =>
    container.querySelector<HTMLElement>(`[data-plan="${id}"]`)!;

  it("shows each plan's catalog values, with Refined only on Copper Plus", async () => {
    const { container } = await renderPricing();
    for (const plan of getPlans()) {
      const text = card(container, plan.id).textContent ?? "";
      expect(text).toContain(plan.name);
      expect(text).toContain(`${formatUsd(plan.monthlyUsd)}/month`);
      if (plan.annualUsd > 0) {
        expect(text).toContain(`${formatUsd(plan.annualUsd)}/year`);
      }
      expect(text).toContain(formatMemory(plan.memoryDays));
      expect(text).toContain(formatNotesHours(plan.notesHoursPerMonth));
      expect(text).toContain(plan.refinedAnswers ? "Included" : "Not included");
    }
    expect(card(container, "copper-plus").textContent).toContain(
      "save $16.88 a year",
    );
  });

  it("follows the catalog when plan prices change", async () => {
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual =
        await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getPlans: () =>
          actual
            .getPlans()
            .map((p) =>
              p.id === "copper-plus"
                ? { ...p, monthlyUsd: 9.49, annualUsd: 95 }
                : p,
            ),
      };
    });
    const { container } = await renderPricing();
    const text = card(container, "copper-plus").textContent ?? "";
    expect(text).toContain("$9.49/month");
    expect(text).toContain("$95/year");
    expect(text).toContain("save $18.88 a year");
    expect(text).not.toContain("$7.99");
  });
});
