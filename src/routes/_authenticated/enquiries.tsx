import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/enquiries")({
  head: () =>
    pageMeta(
      "My Enquiries",
      "Track the status of every request you have sent to Reno Luxe & Interior, from new request to completed.",
    ),
  component: Enquiries,
});

type EnquiryRow = {
  id: string;
  kind: string;
  reference: string | null;
  status: string;
  message: string | null;
  created_at: string;
};

function Enquiries() {
  const { user } = useAuth();
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("enquiries")
        .select("id,kind,reference,status,message,created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      setRows((data ?? []) as EnquiryRow[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <>
      <PageHero
        overline="My enquiries"
        title="Your requests"
        lead="Every enquiry you send while signed in is tracked here with its current status."
      />

      <Section>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <div className="card-luxe grid gap-4 p-10 text-center">
            <MessageCircle className="mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">
              You have no enquiries yet. Send one from any service, package or product page.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/services">Explore services</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/consultation">Book a consultation</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {rows.map((row) => (
              <article
                key={row.id}
                className="card-luxe flex flex-wrap items-center justify-between gap-4 p-6"
              >
                <div>
                  <p className="overline text-primary">{row.kind}</p>
                  <h3 className="mt-1 text-lg font-light">{row.reference ?? "General enquiry"}</h3>
                  {row.message ? (
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">{row.message}</p>
                  ) : null}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(row.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full border border-primary/40 px-4 py-1.5 text-xs tracking-wide text-primary">
                  {row.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
