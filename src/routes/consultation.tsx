import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero, Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { BRAND_IMAGES } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/consultation")({
  head: () =>
    pageMeta(
      "Book a Consultation",
      "Book an interior design or renovation consultation with Reno Luxe & Interior. Share your space, preferred date and goals — we reply every day, 8am–10pm.",
    ),
  component: Consultation,
});

const SPACE_TYPES = ["Apartment", "Duplex / House", "Office", "Retail / Hospitality", "Single room", "Other"];

function Consultation() {
  const [open, setOpen] = useState(false);
  const [spaceType, setSpaceType] = useState(SPACE_TYPES[0] ?? "Apartment");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <>
      <PageHero
        overline="Consultation"
        title="Book a consultation"
        lead={`Share a few details about your space and a preferred date. We respond ${SITE.hours.toLowerCase()}.`}
        image={BRAND_IMAGES.scenes.living}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="card-luxe p-7">
            <h2 className="font-display text-2xl">Consultation details</h2>
            <div className="mt-6 grid gap-5">
              <div className="grid gap-2">
                <Label>Type of space</Label>
                <div className="flex flex-wrap gap-2">
                  {SPACE_TYPES.map((type) => (
                    <Button
                      key={type}
                      size="sm"
                      variant={spaceType === type ? "default" : "outline"}
                      onClick={() => setSpaceType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Preferred date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget range (optional)</Label>
                <Input
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₦2m – ₦5m"
                />
              </div>
              <Button size="lg" onClick={() => setOpen(true)}>
                <MessageCircle /> Continue to send request
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">What happens next</h2>
            <ol className="mt-5 grid gap-4">
              {[
                ["We confirm your slot", "We reply on WhatsApp or by email to confirm the date and time."],
                ["We review your space", "Photos, measurements or a walkthrough — whichever suits you."],
                ["We propose a direction", "Scope, design direction and the right package for your project."],
              ].map(([title, text], index) => (
                <li key={title} className="card-luxe flex gap-4 p-5">
                  <span className="font-display text-2xl text-primary">0{index + 1}</span>
                  <span>
                    <span className="block text-sm">{title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4 text-primary" /> {SITE.hours}
            </p>
          </div>
        </div>
      </Section>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        kind="consultation"
        reference={spaceType}
        title="Book a consultation"
        description="Add your contact and location details to send the request."
        notesLabel="What would you like to achieve?"
        emailSubject="Consultation request"
        buildLines={(values) =>
          [
            "I would like to book a consultation.",
            `Type of space: ${spaceType}`,
            date ? `Preferred date: ${date}` : "",
            budget ? `Budget range: ${budget}` : "",
            values.notes ? `Goals: ${values.notes}` : "",
          ].filter(Boolean)
        }
      />
    </>
  );
}
