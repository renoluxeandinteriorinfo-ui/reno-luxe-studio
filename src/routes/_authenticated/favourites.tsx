import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { useFavourites, useToggleFavourite } from "@/lib/favourites";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/favourites")({
  head: () =>
    pageMeta(
      "My Favourites",
      "Every product, project and concept you have saved with Reno Luxe & Interior, ready to turn into an enquiry.",
    ),
  component: Favourites,
});

function Favourites() {
  const { data, isLoading } = useFavourites();
  const toggle = useToggleFavourite();

  return (
    <>
      <PageHero
        overline="My favourites"
        title="Saved pieces & projects"
        lead="Your shortlist of products, portfolio projects and concepts."
      />

      <Section>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="card-luxe grid gap-4 p-10 text-center">
            <Heart className="mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">
              You haven't saved anything yet. Tap the heart on any product or project.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/products">Browse products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/portfolio">View portfolio</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <article key={item.id} className="card-luxe overflow-hidden p-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="h-48 w-full object-cover" />
                ) : null}
                <div className="grid gap-3 p-5">
                  <p className="overline text-primary">{item.item_type}</p>
                  <h3 className="text-lg font-light">{item.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.item_type === "product" ? (
                      <Button asChild size="sm" variant="outline">
                        <Link to="/products/$slug" params={{ slug: item.item_id }}>
                          View
                        </Link>
                      </Button>
                    ) : item.item_type === "project" ? (
                      <Button asChild size="sm" variant="outline">
                        <Link to="/portfolio/$slug" params={{ slug: item.item_id }}>
                          View
                        </Link>
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        toggle.mutate({
                          item_type: item.item_type,
                          item_id: item.item_id,
                          title: item.title,
                          image_url: item.image_url,
                        })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
