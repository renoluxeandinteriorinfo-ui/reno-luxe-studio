import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Globe2, MessageCircle, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { FavouriteButton } from "@/components/FavouriteButton";
import { PRODUCTS, getProduct } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    }
    const meta = pageMeta(loaderData.product.name, loaderData.product.short);
    return {
      meta: [
        ...meta.meta,
        { property: "og:image", content: loaderData.product.image },
        { name: "twitter:image", content: loaderData.product.image },
      ],
    };
  },
  component: ProductDetail,
});

const INSTALLATION_COPY = {
  professional: "Professional installation recommended (available within Nigeria).",
  diy: "Simple self-setup — no installation required.",
  either: "Self-setup or professional installation, depending on your preference.",
} as const;

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  return (
    <>
      <Section className="pt-10">
        <Button asChild variant="ghost" className="mb-6 -ml-3">
          <Link to="/products">
            <ArrowLeft /> Back to catalogue
          </Link>
        </Button>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <img
              src={product.gallery[active] ?? product.image}
              alt={product.name}
              className="max-h-[38rem] w-full rounded-sm border border-border bg-secondary/30 object-contain p-3 shadow-luxe"
            />
            {product.gallery.length > 1 ? (
              <div className="mt-3 flex gap-3">
                {product.gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`size-20 overflow-hidden rounded-sm border ${
                      index === active ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={image} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="overline text-primary">{product.category}</p>
            <h1 className="mt-3 font-display text-4xl">{product.name}</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-7 grid gap-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <Wrench className="mt-0.5 size-4 shrink-0 text-primary" />
                {INSTALLATION_COPY[product.installation]}
              </p>
              <p className="flex items-start gap-2.5">
                <Globe2 className="mt-0.5 size-4 shrink-0 text-primary" />
                Worldwide delivery available — cost and timeline confirmed for your destination.
              </p>
              <p className="flex items-start gap-2.5">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                Pricing is shared on enquiry, based on quantity, finish and delivery location.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setOpen(true)}>
                <MessageCircle /> Enquire about this product
              </Button>
              <FavouriteButton
                itemType="product"
                itemId={product.slug}
                title={product.name}
                imageUrl={product.image}
                withLabel
              />
            </div>
          </div>
        </div>

        {related.length ? (
          <>
            <div className="hairline my-14" />
            <h2 className="font-display text-2xl">You may also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/products/$slug"
                  params={{ slug: item.slug }}
                  className="card-luxe group overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-4 text-sm">{item.name}</div>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </Section>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        kind="product"
        reference={product.name}
        title={`Enquiry: ${product.name}`}
        description="Send your details and we'll confirm price, availability and delivery."
        withQuantity
        emailSubject={`Product enquiry — ${product.name}`}
        buildLines={(values) => [
          `I would like to enquire about: ${product.name} (${product.category}).`,
          `Quantity: ${values.quantity || "1"}`,
        ]}
      />
    </>
  );
}
