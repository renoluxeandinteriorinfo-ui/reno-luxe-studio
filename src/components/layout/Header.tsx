import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND_IMAGES } from "@/lib/catalog";
import { SITE, whatsappLink } from "@/lib/site";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/plans", label: "Plans" },
  { to: "/products", label: "Products" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/visualize", label: "Visualize" },
  { to: "/viju", label: "Viju" },
  { to: "/contact", label: "Contact" },
] as const;

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <img
        src={BRAND_IMAGES.logo}
        alt="Reno Luxe & Interior logo"
        width={44}
        height={44}
        className="size-10 shrink-0 rounded-sm object-cover"
      />
      {!compact ? (
        <span className="min-w-0">
          <span className="block truncate font-display text-base leading-tight tracking-wide text-foreground">
            RENO LUXE
          </span>
          <span className="overline block text-[0.55rem] text-primary">& Interior</span>
        </span>
      ) : null}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Brand />

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-sm px-3 py-2 text-[0.8rem] tracking-wide text-muted-foreground transition-colors hover:text-primary",
                pathname === link.to && "text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button asChild variant="ghost" size="icon" aria-label="Your account">
            <Link to={user ? "/account" : "/login"}>
              <UserRound />
            </Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a
              href={whatsappLink(`Hello ${SITE.name}, I would like to discuss a project.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle /> WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="px-5 pt-6">
                <Brand />
              </div>
              <nav className="mt-6 grid gap-1 px-3 pb-24">
                {[...NAV_LINKS, { to: "/consultation", label: "Consultation" }, { to: "/delivery", label: "Delivery" }, { to: "/faq", label: "FAQ" }].map(
                  (link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-sm px-4 py-3 text-sm tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-primary",
                        pathname === link.to && "bg-secondary text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                <div className="hairline my-3" />
                <Link
                  to={user ? "/account" : "/login"}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-4 py-3 text-sm tracking-wide text-muted-foreground hover:text-primary"
                >
                  {user ? "My account" : "Sign in / Sign up"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
