import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import { getPrivacySummary } from "@/lib/copper/catalog";

// The mascot is a square PNG on a transparent background.
const MASCOT_SIZE = 1254;

// The privacy facts, word for word from the catalog (the current policy).
// Calm layout with Patina Teal accents; the mascot sits beside the list.
export function PrivacySection() {
  const privacy = getPrivacySummary();

  return (
    <section
      data-testid="privacy-summary"
      id="privacy"
      className="bg-accent/10 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your privacy, in plain words
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            How Copper handles your recordings under our {privacy.policy}{" "}
            privacy policy.
          </p>
          <ul className="mt-8 space-y-4">
            {privacy.points.map((point) => (
              <li key={point} className="flex gap-3">
                <ShieldCheckIcon
                  aria-hidden
                  className="text-accent mt-0.5 size-6 shrink-0"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/assets/brand/copper-mascot.png"
          alt="Copper the robot mascot: a copper robot in a yellow hard hat with a headlamp, waving and holding a checklist"
          width={MASCOT_SIZE}
          height={MASCOT_SIZE}
          sizes="(min-width: 768px) 280px, 160px"
          className="order-first mx-auto h-auto w-40 md:order-none md:w-full md:max-w-72"
        />
      </div>
    </section>
  );
}
