import { Link } from "@tanstack/react-router";
import {
  Clock,
  Globe,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Phone,
  Facebook,
} from "lucide-react";
import { Brand } from "@/components/layout/Header";
import { SITE, whatsappLink } from "@/lib/site";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { to: "/services", label: "Services" },
      { to: "/plans", label: "Plans & Packages" },
      { to: "/products", label: "Products" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/visualize", label: "Visualize Your Space" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/viju", label: "Viju Wholesale" },
      { to: "/delivery", label: "Delivery Information" },
      { to: "/consultation", label: "Consultation" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Account & Legal",
    links: [
      { to: "/account", label: "My Account" },
      { to: "/favourites", label: "My Favourites" },
      { to: "/enquiries", label: "My Enquiries" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_oklab,var(--onyx)_70%,var(--background))] pb-24 lg:pb-0">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 font-display text-lg text-primary">{SITE.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Interior design, renovation, styling and décor — with worldwide product delivery and
              installation available within Nigeria.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SITE.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE.social.instagram.handle}`}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={SITE.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${SITE.social.tiktok.handle}`}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Music2 className="size-4" />
              </a>
              <a
                href={SITE.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={whatsappLink(`Hello ${SITE.name}, I found you through your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="overline text-primary">{column.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-10" />

        <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-center gap-2">
            <Phone className="size-4 text-primary" /> {SITE.phone}
          </p>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail className="size-4 shrink-0 text-primary" />
            <span className="truncate">{SITE.email}</span>
          </a>
          <p className="flex items-center gap-2">
            <Clock className="size-4 text-primary" /> {SITE.hours}
          </p>
          <p className="flex items-center gap-2">
            <Globe className="size-4 text-primary" /> Worldwide delivery
          </p>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
