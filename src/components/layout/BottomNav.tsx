import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Heart, Home, LayoutGrid, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();

  const items = [
    { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
    {
      to: "/services",
      label: "Explore",
      icon: Compass,
      match: (p: string) =>
        ["/services", "/plans", "/portfolio", "/visualize", "/viju", "/about"].some((x) =>
          p.startsWith(x),
        ),
    },
    {
      to: "/products",
      label: "Products",
      icon: LayoutGrid,
      match: (p: string) => p.startsWith("/products"),
    },
    {
      to: user ? "/favourites" : "/login",
      label: "Saved",
      icon: Heart,
      match: (p: string) => p.startsWith("/favourites"),
    },
    {
      to: user ? "/account" : "/login",
      label: "Account",
      icon: UserRound,
      match: (p: string) => p.startsWith("/account") || p.startsWith("/login") || p.startsWith("/signup") || p.startsWith("/enquiries"),
    },
  ] as const;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.62rem] tracking-[0.16em] uppercase transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-colors",
                    active && "bg-primary/12 shadow-gold",
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
