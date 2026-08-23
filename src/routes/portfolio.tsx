import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero, Section } from "@/components/Section";
import { FavouriteButton } from "@/components/FavouriteButton";
import { BRAND_IMAGES, PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageMeta(
      "Portfolio",
      "Residential, commercial, renovation and interior styling work by Reno Luxe & Interior, alongside clearly-labelled concept directions.",
    ),
  component: Portfolio,
});

function Portfolio() {
  const [category, setCategory] = useState("All");
  const items = PORTFOLIO.filter((p) => category === "All" || p.category === category);

  return (
    <>
      <PageHero
        overline="Portfolio"
        title="Work & concepts"
        lead="Styling references from our collection alongside concept directions. Concept pieces are labelled so you always know what is a completed space and what is a design direction."
        image={BRAND_IMAGES.strip}
      />

      <Section>
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
          {PORTFOLIO_CATEGORIES.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={category === item ? "default" : "outline"}
              onClick={() => setCategory(item)}
              className="shrink-0 snap-start"
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <article key={project.slug} className="card-luxe group relative overflow-hidden">
              <FavouriteButton
                itemType="project"
                itemId={project.slug}
                title={project.name}
                imageUrl={project.cover}
                className="absolute top-2 right-2 z-10"
              />
              <Link to="/portfolio/$slug" params={{ slug: project.slug }}>
                <img
                  src={project.cover}
                  alt={project.name}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="overline text-primary">{project.category}</p>
                    {project.concept ? <Badge variant="secondary">Concept</Badge> : null}
                  </div>
                  <h2 className="mt-2 font-display text-xl">{project.name}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.short}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
