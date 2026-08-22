import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Gem, HeartHandshake, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/Section";
import { BRAND_IMAGES } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About Us",
      `Reno Luxe & Interior is led by ${SITE.ceo}, certified in interior design and decor, creating refined interiors through renovation, design and styling.`,
    ),
  component: About,
});

const VALUES = [
  { icon: Gem, title: "Luxury", text: "Considered materials, finishes and detailing in every scheme." },
  { icon: Ruler, title: "Precision", text: "Space planning and execution handled with care and accuracy." },
  { icon: HeartHandshake, title: "Service", text: "Clear communication from first enquiry to final styling." },
  { icon: BadgeCheck, title: "Quality", text: "Products and workmanship selected to last, not just to look good." },
];

function About() {
  return (
    <>
      <PageHero
        overline="About us"
        title="Beyond renovation, into luxury"
        lead="Reno Luxe & Interior creates refined, liveable interiors through renovation, interior design, styling and premium décor — for private homes and commercial spaces."
        image={BRAND_IMAGES.scenes.living}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading overline="Leadership" title={SITE.ceo} />
            <p className="mt-3 text-sm text-primary">{SITE.credential} · CEO & Lead Designer</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Reno Luxe & Interior was founded on a simple belief: a well-designed space changes how
              people live and work in it. Every project — from a single styled room to a full home
              transformation — is approached with the same attention to proportion, light, material
              and finish.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The studio works with private clients, developers and commercial spaces, and supplies
              furniture and décor to customers worldwide.
            </p>
          </div>
          <img
            src={BRAND_IMAGES.poster}
            alt="Reno Luxe & Interior brand identity"
            className="w-full rounded-sm border border-border object-cover shadow-luxe"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="border-y border-border bg-card/40">
        <SectionHeading overline="Our values" title="How we work" align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="card-luxe p-6">
              <value.icon className="size-5 text-primary" />
              <h3 className="mt-4 font-display text-xl">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          overline="Our process"
          title="From first message to final styling"
          lead="A clear, repeatable process so you always know what happens next."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Enquiry", "You send us your space details on WhatsApp or by email."],
            ["Consultation", "We discuss your goals, style, timeline and scope."],
            ["Design direction", "Palette, layout, materials, furniture and décor are proposed."],
            ["Sourcing", "Products are selected and confirmed with you, including delivery."],
            ["Execution", "Renovation and installation carried out within Nigeria."],
            ["Final styling", "Accessories and finishing layer placed — then handover."],
          ].map(([title, text], index) => (
            <li key={title} className="card-luxe flex gap-5 p-6">
              <span className="font-display text-3xl text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-base">{title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                  {text}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-9">
          <Link to="/consultation">
            Book a consultation <ArrowRight />
          </Link>
        </Button>
      </Section>
    </>
  );
}
