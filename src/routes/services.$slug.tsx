import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { SERVICES, getServiceBySlug } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    return pageMeta(loaderData.service.title, loaderData.service.summary);
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHero overline="Service" title={service.title} lead={service.summary} image={service.image} />

      <Section>
        <Button asChild variant="ghost" className="mb-8 -ml-3">
          <Link to="/services">
            <ArrowLeft /> All services
          </Link>
        </Button>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">{service.detail}</p>
            <h2 className="mt-10 font-display text-2xl">What's included</h2>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              {service.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary" /> {point}
                </li>
              ))}
            </ul>
          </div>

          <aside className="card-luxe h-fit p-6">
            <h2 className="font-display text-2xl">Request this service</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tell us about your space and location. We'll follow up on WhatsApp or by email with
              next steps, timelines and pricing.
            </p>
            <Button className="mt-6 w-full" onClick={() => setOpen(true)}>
              <MessageCircle /> Request this service
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/consultation">Book a consultation</Link>
            </Button>
          </aside>
        </div>

        <div className="hairline my-14" />

        <h2 className="font-display text-2xl">Other services</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <Button key={s.slug} asChild variant="outline" size="sm">
              <Link to="/services/$slug" params={{ slug: s.slug }}>
                {s.title}
              </Link>
            </Button>
          ))}
        </div>
      </Section>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        kind="service"
        reference={service.title}
        title={`Request: ${service.title}`}
        description="Share your details and we'll get straight back to you."
        notesLabel="Tell us about your space"
        emailSubject={`Service request — ${service.title}`}
        buildLines={(values) => [
          `I would like to request the following service: ${service.title}.`,
          values.notes ? `About my space: ${values.notes}` : "",
        ].filter(Boolean)}
      />
    </>
  );
}
