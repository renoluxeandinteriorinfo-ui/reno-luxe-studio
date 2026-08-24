import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { FavouriteButton } from "@/components/FavouriteButton";
import { getProject } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const meta = pageMeta(loaderData.project.name, loaderData.project.short);
    return {
      meta: [
        ...meta.meta,
        { property: "og:image", content: loaderData.project.cover },
        { name: "twitter:image", content: loaderData.project.cover },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Section className="pt-10">
        <Button asChild variant="ghost" className="mb-6 -ml-3">
          <Link to="/portfolio">
            <ArrowLeft /> Back to portfolio
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <p className="overline text-primary">{project.category}</p>
          {project.concept ? <Badge variant="secondary">Concept direction</Badge> : null}
        </div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {project.overview}
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image) => (
            <img
              key={image}
              src={image}
              alt={project.name}
              className="w-full rounded-sm border border-border object-cover shadow-luxe"
              loading="lazy"
            />
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl">The approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.approach}</p>

            <h2 className="mt-9 font-display text-2xl">Services applied</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>

            <h2 className="mt-9 font-display text-2xl">Pieces used</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.pieces.map((piece) => (
                <Badge key={piece} variant="outline">
                  {piece}
                </Badge>
              ))}
            </div>
          </div>

          <aside className="card-luxe h-fit p-6">
            <h2 className="font-display text-2xl">Want something like this?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Send an enquiry and we'll adapt this direction to your own space, budget and location.
            </p>
            <Button className="mt-6 w-full" onClick={() => setOpen(true)}>
              <MessageCircle /> Request a similar project
            </Button>
            <div className="mt-3">
              <FavouriteButton
                itemType="project"
                itemId={project.slug}
                title={project.name}
                imageUrl={project.cover}
                withLabel
                className="w-full"
              />
            </div>
          </aside>
        </div>
      </Section>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        kind="project"
        reference={project.name}
        title={`Request: ${project.name}`}
        description="Tell us about your space and we'll adapt this direction."
        notesLabel="Tell us about your space"
        emailSubject={`Project enquiry — ${project.name}`}
        buildLines={(values) =>
          [
            `I would like a project similar to "${project.name}" from your portfolio.`,
            values.notes ? `About my space: ${values.notes}` : "",
          ].filter(Boolean)
        }
      />
    </>
  );
}
