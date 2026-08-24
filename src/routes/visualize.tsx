import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { streamImage } from "@/lib/streamImage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/visualize")({
  head: () =>
    pageMeta(
      "Visualize Your Space",
      "Describe your room and generate a conceptual interior visualization instantly, then send it to Reno Luxe & Interior to make it real.",
    ),
  component: Visualize,
});

const SPACES = ["Living room", "Bedroom", "Kitchen", "Dining room", "Office", "Retail space"];
const STYLES = [
  "Modern luxury",
  "Black & gold",
  "Warm minimal",
  "Classic elegance",
  "Contemporary Afro-luxe",
  "Soft neutral",
];

function Visualize() {
  const { user } = useAuth();
  const [space, setSpace] = useState(SPACES[0] ?? "Living room");
  const [style, setStyle] = useState(STYLES[0] ?? "Modern luxury");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [enquiry, setEnquiry] = useState(false);

  async function generate() {
    setBusy(true);
    setImage(null);
    setIsFinal(false);
    const prompt = `Photorealistic interior design visualization of a ${space.toLowerCase()} in a ${style.toLowerCase()} style. Elegant, luxurious, warm layered lighting, refined materials and finishes, professionally styled, architectural photography, wide angle.${
      notes ? ` Additional requirements: ${notes}` : ""
    }`;

    try {
      await streamImage("/api/generate-image", prompt, (dataUrl, final) => {
        setImage(dataUrl);
        if (final) setIsFinal(true);
      });
      toast.success("Your concept is ready");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate the visualization");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!user || !image) return;
    try {
      const blob = await (await fetch(image)).blob();
      const path = `${user.id}/${crypto.randomUUID()}.png`;
      const { error: uploadError } = await supabase.storage
        .from("visualizations")
        .upload(path, blob, { contentType: "image/png" });
      if (uploadError) throw uploadError;
      const { error } = await supabase.from("visualizations").insert({
        user_id: user.id,
        image_url: path,
        space_type: space,
        style,
        notes: notes || null,
      });
      if (error) throw error;
      toast.success("Saved to your account");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save the visualization");
    }
  }

  return (
    <>
      <PageHero
        overline="Visualize your space"
        title="See it before you build it"
        lead="Describe your space and preferred style to generate a conceptual visualization. Concepts are for inspiration — the final design is developed with our team."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          <div className="card-luxe h-fit p-7">
            <div className="grid gap-6">
              <div className="grid gap-2.5">
                <Label>Type of space</Label>
                <div className="flex flex-wrap gap-2">
                  {SPACES.map((item) => (
                    <Button
                      key={item}
                      size="sm"
                      variant={space === item ? "default" : "outline"}
                      onClick={() => setSpace(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2.5">
                <Label>Style direction</Label>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((item) => (
                    <Button
                      key={item}
                      size="sm"
                      variant={style === item ? "default" : "outline"}
                      onClick={() => setStyle(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2.5">
                <Label htmlFor="notes">Anything specific?</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. dark panelled feature wall, gold accents, space for a 3-seater couch"
                />
              </div>

              <Button size="lg" onClick={generate} disabled={busy}>
                {busy ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {busy ? "Generating…" : "Generate visualization"}
              </Button>
            </div>
          </div>

          <div>
            <div className="card-luxe flex min-h-[320px] items-center justify-center overflow-hidden p-0">
              {image ? (
                <img
                  src={image}
                  alt={`${style} ${space} concept visualization`}
                  className={cn(
                    "w-full object-cover transition-[filter] duration-700",
                    isFinal ? "blur-0" : "blur-xl",
                  )}
                />
              ) : (
                <p className="max-w-xs px-6 py-16 text-center text-sm text-muted-foreground">
                  {busy
                    ? "Creating your concept — this usually takes a few seconds."
                    : "Your generated concept will appear here."}
                </p>
              )}
            </div>

            {image && isFinal ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setEnquiry(true)}>
                  <MessageCircle /> Make this real
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={image}
                    download={`reno-luxe-${space.toLowerCase().replace(/\s+/g, "-")}.png`}
                  >
                    <Download /> Download
                  </a>
                </Button>
                {user ? (
                  <Button variant="outline" onClick={save}>
                    Save to my account
                  </Button>
                ) : null}
              </div>
            ) : null}

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Visualizations are conceptual and generated by AI. They illustrate a direction rather
              than a guaranteed final result.
            </p>
          </div>
        </div>
      </Section>

      <EnquiryDialog
        open={enquiry}
        onOpenChange={setEnquiry}
        kind="custom"
        reference={`${style} ${space}`}
        title="Turn this concept into reality"
        description="Send us your concept details and we'll take it from here."
        notesLabel="Anything else we should know?"
        emailSubject={`Visualization enquiry — ${style} ${space}`}
        buildLines={(values) =>
          [
            "I generated a concept with the Visualize Your Space tool and would like to make it real.",
            `Space: ${space}`,
            `Style: ${style}`,
            notes ? `Concept notes: ${notes}` : "",
            values.notes ? `Extra details: ${values.notes}` : "",
          ].filter(Boolean)
        }
      />
    </>
  );
}
