import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, PackageCheck, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { VIJU_ITEMS } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/viju")({
  head: () =>
    pageMeta(
      "Viju Wholesale Distribution",
      "Wholesale supply of Viju drinks, milk drinks, yoghurt and water for retailers, events, offices and bulk buyers. Enquire on WhatsApp for bulk pricing.",
    ),
  component: Viju,
});

const POINTS = [
  { icon: PackageCheck, title: "Bulk quantities", text: "Cartons and pallets for retailers, events and offices." },
  { icon: Truck, title: "Delivery arranged", text: "Delivery is arranged per order, based on quantity and destination." },
  { icon: Users, title: "Trade & retail", text: "Supply for shops, distributors, caterers and corporate buyers." },
];

function Viju() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = VIJU_ITEMS.find((v) => v.slug === selected);

  return (
    <>
      <PageHero
        overline="Viju wholesale"
        title="Viju drinks — wholesale supply"
        lead="Alongside interiors, Reno Luxe supplies Viju products at wholesale. Milk drinks, yoghurt, flavoured drinks and water — available in bulk for retailers, events and offices."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.title} className="card-luxe p-6">
              <point.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-xl">{point.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          overline="Product range"
          title="Available selections"
          lead="Pricing depends on quantity, product mix and delivery location — send an enquiry for a wholesale quote."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VIJU_ITEMS.map((item) => (
            <article key={item.slug} className="card-luxe overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="aspect-4/3 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-base">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => setSelected(item.slug)}
                >
                  <MessageCircle /> Bulk enquiry
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {active ? (
        <EnquiryDialog
          open={!!selected}
          onOpenChange={(open) => setSelected(open ? selected : null)}
          kind="viju"
          reference={active.name}
          title={`Wholesale enquiry: ${active.name}`}
          description="Tell us the quantity you need and where it should be delivered."
          withQuantity
          notesLabel="Products and quantities required"
          emailSubject={`Viju wholesale enquiry — ${active.name}`}
          buildLines={(values) => [
            `I would like a wholesale quote for: ${active.name}.`,
            `Quantity (cartons/units): ${values.quantity || "to be confirmed"}`,
          ]}
        />
      ) : null}
    </>
  );
}
