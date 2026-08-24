import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-16 sm:px-8 md:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  overline,
  title,
  lead,
  align = "left",
}: {
  overline?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {overline ? <p className="overline text-primary">{overline}</p> : null}
      <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {lead ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{lead}</p>
      ) : null}
    </div>
  );
}

export function PageHero({
  overline,
  title,
  lead,
  image,
}: {
  overline: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-border">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-veil)]" />
        </>
      ) : null}
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <p className="overline animate-fade text-primary">{overline}</p>
        <h1 className="animate-rise mt-4 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="animate-rise mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lead}
          </p>
        ) : null}
        <div className="hairline mt-8 max-w-xs" />
      </div>
    </header>
  );
}
