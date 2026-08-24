import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MessageCircle, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/Section";
import { BRAND_IMAGES, PACKAGES, PORTFOLIO, PRODUCTS, SERVICES } from "@/lib/catalog";
import { SITE, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Luxury Interior Design & Renovation",
      "Reno Luxe & Interior delivers luxury interior design, renovation, styling and premium décor. Worldwide product delivery, installation within Nigeria.",
    ),
  component: Home,
});

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Design-led",
    text: "Every space is planned, styled and finished with intent — never assembled by accident.",
  },
  {
    icon: Globe2,
    title: "Worldwide delivery",
    text: "Products ship internationally. Delivery cost and timeline are confirmed on enquiry.",
  },
  {
    icon: Wrench,
    title: "Installation in Nigeria",
    text: "Professional installation and full project execution available across Nigeria.",
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img
          src={BRAND_IMAGES.hero}
          alt="Luxury interior styled by Reno Luxe & Interior"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-veil)]" />
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-end px-5 pt-28 pb-16 sm:px-8 md:justify-center md:pb-24">
          <p className="overline animate-fade text-primary">{SITE.credential}</p>
          <h1 className="animate-rise mt-5 max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Reno Luxe <span className="text-gold-gradient font-display italic">& Interior</span>
          </h1>
          <p className="animate-rise mt-5 font-display text-xl text-primary sm:text-2xl">
            {SITE.tagline}
          </p>
          <p className="animate-rise mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Interior design, renovation, styling and premium décor for homes and commercial spaces —
            with products delivered worldwide and full installation available within Nigeria.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/consultation">
                Book a consultation <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section className="border-b border-border">
        <div className="grid gap-8 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="card-luxe p-6">
              <item.icon className="size-5 text-primary" />
              <h3 className="mt-4 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src={BRAND_IMAGES.poster}
            alt="Reno Luxe & Interior brand"
            className="w-full rounded-sm border border-border object-cover shadow-luxe"
            loading="lazy"
          />
          <div>
            <SectionHeading
              overline="About us"
              title="Beyond renovation, into luxury"
              lead={`Reno Luxe & Interior is led by ${SITE.ceo}, ${SITE.credential.toLowerCase()}. We create refined interiors through renovation, design, styling and carefully selected décor.`}
            />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Whether you need a single room styled, a full home transformed, or a commercial space
              planned and executed, the process starts the same way — a conversation about how you
              want the space to feel.
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/about">
                More about us <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="border-y border-border bg-card/40">
        <SectionHeading
          overline="Services"
          title="What we do"
          lead="From full renovations to the finishing accessories, each service can be taken on its own or combined into a complete project."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="card-luxe group overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-display text-xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/services">
            All services <ArrowRight />
          </Link>
        </Button>
      </Section>

      <Section>
        <SectionHeading
          overline="Products"
          title="Selected pieces"
          lead="Furniture, lighting, mirrors, sculptures and décor accessories. Enquire on WhatsApp or by email — pricing and delivery are confirmed per destination."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRODUCTS.slice(0, 8).map((product) => (
            <Link
              key={product.slug}
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="card-luxe group overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-4">
                <p className="overline text-primary">{product.category}</p>
                <h3 className="mt-1 text-sm">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/products">
            View catalogue <ArrowRight />
          </Link>
        </Button>
      </Section>

      <Section className="border-y border-border bg-card/40">
        <SectionHeading
          overline="Portfolio"
          title="Recent work & concepts"
          lead="Completed styling references alongside clearly-labelled concept directions."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              to="/portfolio/$slug"
              params={{ slug: project.slug }}
              className="card-luxe group overflow-hidden"
            >
              <img
                src={project.cover}
                alt={project.name}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-5">
                <p className="overline text-primary">
                  {project.concept ? "Concept" : project.category}
                </p>
                <h3 className="mt-1 font-display text-xl">{project.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/portfolio">
            Full portfolio <ArrowRight />
          </Link>
        </Button>
      </Section>

      <Section>
        <SectionHeading
          overline="Plans & packages"
          title="Structured ways to work with us"
          lead="Choose the package that matches your project scope. Pricing is discussed after we understand your space."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.slice(0, 6).map((pkg) => (
            <div key={pkg.slug} className="card-luxe p-6">
              <h3 className="font-display text-xl">{pkg.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.intro}</p>
            </div>
          ))}
        </div>
        <Button asChild className="mt-8">
          <Link to="/plans">
            Compare packages <ArrowRight />
          </Link>
        </Button>
      </Section>

      <Section className="border-t border-border">
        <div className="card-luxe grid gap-6 p-8 text-center md:p-14">
          <p className="overline text-primary">Start your project</p>
          <h2 className="font-display text-3xl sm:text-5xl">Tell us about your space</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            Send us a message on WhatsApp or by email. We reply {SITE.hours.toLowerCase()}.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a
                href={whatsappLink(`Hello ${SITE.name}, I would like to start a project.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact page</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
