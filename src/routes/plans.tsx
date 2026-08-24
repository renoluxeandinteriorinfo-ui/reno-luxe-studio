import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { Badge } from "@/components/ui/badge";
import { BRAND_IMAGES, PACKAGES } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/plans")({
  head: () =>
    pageMeta(
      "Plans & Packages",
      "Full house transformation, single room makeover, luxury office setup, décor-only styling, consultation-only and custom project packages.",
    ),
  component: Plans,
});

function Plans() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = PACKAGES.find((p) => p.slug === selected);

  return (
    <>
      <PageHero
        overline="Plans & packages"
        title="Structured ways to work with us"
        lead="Each package sets a clear scope. Pricing is confirmed after we understand your space, location and requirements — no two projects are identical."
        image={BRAND_IMAGES.scenes.bedroom}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article key={pkg.slug} className="card-luxe flex flex-col p-7">
              <h2 className="font-display text-2xl">{pkg.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.intro}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {pkg.bestFor.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>

              <ul className="mt-6 grid flex-1 gap-2.5 text-sm text-muted-foreground">
                {pkg.scope.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
                  </li>
                ))}
              </ul>

              <Button className="mt-7 w-full" onClick={() => setSelected(pkg.slug)}>
                <MessageCircle /> Enquire about this package
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          overline="Not sure which fits?"
          title="Start with a consultation"
          lead="We'll review your space and recommend the right package — or scope something custom."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link to="/consultation">Book a consultation</Link>
          </Button>
        </div>
      </Section>

      {active ? (
        <EnquiryDialog
          open={!!selected}
          onOpenChange={(open) => setSelected(open ? selected : null)}
          kind="package"
          reference={active.title}
          title={`Enquiry: ${active.title}`}
          description={active.intro}
          notesLabel="Tell us about your space"
          emailSubject={`Package enquiry — ${active.title}`}
          buildLines={(values) =>
            [
              `I am interested in the "${active.title}" package.`,
              values.notes ? `About my space: ${values.notes}` : "",
            ].filter(Boolean)
          }
        />
      ) : null}
    </>
  );
}
