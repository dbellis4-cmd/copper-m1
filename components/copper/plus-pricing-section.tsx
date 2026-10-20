import { CheckIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  type Plan,
} from "@/lib/copper/catalog";

// What paying yearly saves over twelve monthly payments, in whole cents.
function annualSavings(plan: Plan): number {
  return Math.round((plan.monthlyUsd * 12 - plan.annualUsd) * 100) / 100;
}

// Free vs. Copper Plus, side by side (stacked on phones). Every price and
// plan detail comes from the catalog.
export function PlusPricingSection() {
  const plans = getPlans();

  return (
    <section data-testid="plus-pricing" id="plus" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Copper Plus
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every Copper works great for free. Copper Plus adds the smartest
            answers and the longest memory.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const isPlus = plan.id === "copper-plus";
            const savings = annualSavings(plan);
            return (
              <Card
                key={plan.id}
                data-plan={plan.id}
                className={`gap-6 py-6 text-base ${isPlus ? "ring-primary ring-2" : ""}`}
              >
                <CardHeader className="px-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    {isPlus && (
                      <Badge>Covers every device in your household</Badge>
                    )}
                  </div>
                  <p className="mt-4">
                    <span className="text-4xl font-bold">
                      {formatUsd(plan.monthlyUsd)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                  {plan.annualUsd > 0 && (
                    <p className="text-muted-foreground">
                      or {formatUsd(plan.annualUsd)}/year
                      {savings > 0 && (
                        <span className="text-primary font-semibold">
                          {" "}
                          (save {formatUsd(savings)} a year)
                        </span>
                      )}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="px-6">
                  <dl className="divide-y border-t">
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">Memory kept</dt>
                      <dd className="font-semibold">
                        {formatMemory(plan.memoryDays)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">Notes recording</dt>
                      <dd className="font-semibold">
                        {formatNotesHours(plan.notesHoursPerMonth)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">Refined answers</dt>
                      <dd className="flex items-center gap-1.5 font-semibold">
                        {plan.refinedAnswers ? (
                          <>
                            <CheckIcon
                              aria-hidden
                              className="text-primary size-5"
                            />
                            Included
                          </>
                        ) : (
                          <>
                            <MinusIcon
                              aria-hidden
                              className="text-muted-foreground size-5"
                            />
                            Not included
                          </>
                        )}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
