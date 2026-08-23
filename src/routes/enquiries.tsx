import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { useAuth } from "@/lib/auth";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/enquiries")({ head: () => pageMeta("My Enquiries", "Track your Reno Luxe & Interior enquiries and projects."), component: Enquiries });

function Enquiries() {
  const { user } = useAuth();
  return <Section className="min-h-[65vh]"><div className="flex items-start justify-between gap-4"><div><p className="overline text-primary">Account</p><h1 className="mt-3 font-display text-4xl">My Enquiries / Projects</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Your enquiry history and project updates will be shown here with their current status.</p></div><ClipboardList className="hidden size-8 text-primary sm:block" /></div>{!user ? <div className="card-luxe mt-8 p-7"><p className="text-sm text-muted-foreground">Sign in to view enquiries linked to your account.</p><Button asChild className="mt-5"><Link to="/login">Sign in</Link></Button></div> : <div className="card-luxe mt-8 p-7"><h2 className="font-display text-2xl">No enquiries yet</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start a WhatsApp or contact enquiry and it will be linked here once the account data service is connected.</p><Button asChild variant="outline" className="mt-5"><Link to="/contact">Start an enquiry</Link></Button></div>}</Section>;
}
