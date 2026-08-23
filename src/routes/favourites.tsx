import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { useAuth } from "@/lib/auth";
import { useFavourites } from "@/lib/favourites";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/favourites")({ head: () => pageMeta("Saved Favourites", "Your saved Reno Luxe & Interior products and portfolio projects."), component: Favourites });

function Favourites() {
  const { user } = useAuth();
  const { data, isLoading } = useFavourites();
  if (!user) return <Section className="min-h-[65vh]"><div className="card-luxe mx-auto max-w-lg p-8"><Heart className="size-7 text-primary" /><h1 className="mt-4 font-display text-3xl">Saved pieces</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sign in to save products and portfolio projects for later.</p><Button asChild className="mt-6"><Link to="/login">Sign in</Link></Button></div></Section>;
  return <Section className="min-h-[65vh]"><p className="overline text-primary">Account</p><h1 className="mt-3 font-display text-4xl">Saved / Favourites</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Products and projects you save will appear here.</p>{isLoading ? <p className="mt-10 text-sm text-muted-foreground">Loading your saved items…</p> : data?.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{data.map((item) => <Link key={item.id} to={item.item_type === "product" ? "/products/$slug" : "/portfolio/$slug"} params={{ slug: item.item_id }} className="card-luxe overflow-hidden"><img src={item.image_url ?? ""} alt={item.title} className="aspect-square w-full object-cover" /><div className="p-4"><p className="overline text-primary">{item.item_type}</p><h2 className="mt-2 font-display text-xl">{item.title}</h2></div></Link>)}</div> : <div className="card-luxe mt-8 p-7"><p className="text-sm text-muted-foreground">Nothing saved yet. Explore the catalogue or portfolio to add your first favourite.</p><div className="mt-5 flex gap-3"><Button asChild><Link to="/products">Browse products</Link></Button><Button asChild variant="outline"><Link to="/portfolio">View portfolio</Link></Button></div></div>}</Section>;
}
