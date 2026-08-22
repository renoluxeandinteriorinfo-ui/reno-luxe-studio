import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero, Section } from "@/components/Section";
import { FavouriteButton } from "@/components/FavouriteButton";
import { BRAND_IMAGES, PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () =>
    pageMeta(
      "Products & Décor Catalogue",
      "Swing chairs, couches, centre tables, mirrors, standing lamps, sculptures, figurines, vases and premium décor accessories — delivered worldwide.",
    ),
  component: Products,
});

function Products() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!q ||
          product.name.toLowerCase().includes(q) ||
          product.short.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <>
      <PageHero
        overline="Products"
        title="Furniture, lighting & décor"
        lead="Browse the catalogue and send an enquiry for any piece. Pricing, availability, delivery cost and timeline are confirmed per destination — we deliver worldwide."
        image={BRAND_IMAGES.scenes.retail}
      />

      <Section>
        <div className="flex flex-col gap-5">
          <div className="relative max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="pl-9"
              aria-label="Search products"
            />
          </div>
          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
            {PRODUCT_CATEGORIES.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
                className={cn("shrink-0 snap-start")}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs tracking-widest text-muted-foreground uppercase">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((product) => (
            <article key={product.slug} className="card-luxe group relative overflow-hidden">
              <FavouriteButton
                itemType="product"
                itemId={product.slug}
                title={product.name}
                imageUrl={product.image}
                className="absolute top-2 right-2 z-10"
              />
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="overline text-primary">{product.category}</p>
                  <h2 className="mt-1 text-sm">{product.name}</h2>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {product.short}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            No products match that search. Try a different term or category.
          </p>
        ) : null}
      </Section>
    </>
  );
}
