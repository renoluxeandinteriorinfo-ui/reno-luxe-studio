import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, PackageCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/delivery")({
  head: () =>
    pageMeta(
      "Delivery Information",
      "Reno Luxe & Interior delivers products worldwide. Installation and full project execution are available within Nigeria. Costs confirmed per destination.",
    ),
  component: Delivery,
});

const BLOCKS = [
  {
    icon: Globe2,
    title: "Worldwide product delivery",
    text: "Furniture, décor and accessories can be shipped internationally. Shipping cost and transit time depend on the items, quantity and destination country, and are confirmed during your enquiry before anything is committed.",
  },
  {
    icon: Wrench,
    title: "Installation within Nigeria",
    text: "Professional installation, renovation and full project execution are carried out within Nigeria. For international orders, we supply the products and provide guidance, but on-site works are not included.",
  },
  {
    icon: Truck,
    title: "Local delivery in Nigeria",
    text: "Delivery within Nigeria is arranged per order. Timelines depend on the destination city and item availability.",
  },
  {
    icon: PackageCheck,
    title: "Packaging & handling",
    text: "Fragile décor, mirrors and sculptures are packed for transit. Any special handling requirements are agreed before dispatch.",
  },
];

function Delivery() {
  return (
    <>
      <PageHero
        overline="Delivery"
        title="Delivery information"
        lead="We deliver products worldwide, and carry out installation and project execution within Nigeria."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {BLOCKS.map((block) => (
            <article key={block.title} className="card-luxe p-7">
              <block.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-2xl">{block.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          overline="Costs & timelines"
          title="Always confirmed before you commit"
          lead="Product pricing, delivery charges, duties where applicable and expected timelines are confirmed in writing during your enquiry. Nothing is dispatched before you approve."
        />
        <Button asChild className="mt-8">
          <Link to="/contact">Ask about delivery</Link>
        </Button>
      </Section>
    </>
  );
}
