import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { BRAND_IMAGES, SERVICES } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Interior Design & Renovation Services",
      "Luxury home renovation, interior design and styling, premium furniture and décor, space planning, 3D visualization and custom interior projects.",
    ),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        overline="Services"
        title="Design, renovation and styling"
        lead="Take a single service or combine several into one complete project. Every engagement begins with a conversation about your space."
        image={BRAND_IMAGES.scenes.office}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.slug} className="card-luxe group overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="font-display text-2xl">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-4 grid gap-1.5 text-sm text-muted-foreground">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-primary" /> {point}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/services/$slug" params={{ slug: service.slug }}>
                    Learn more <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
