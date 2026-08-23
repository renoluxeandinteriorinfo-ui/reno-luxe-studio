import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MessageCircle, Music2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { SITE, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact Us",
      `Contact Reno Luxe & Interior on WhatsApp ${SITE.phone} or by email. Open every day 8:00 AM – 10:00 PM.`,
    ),
  component: Contact,
});

function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHero
        overline="Contact"
        title="Let's talk about your space"
        lead={`Message us on WhatsApp for the fastest reply, or send an email. We are available ${SITE.hours.toLowerCase()}.`}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <a
              href={whatsappLink(`Hello ${SITE.name}, I would like to make an enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-luxe flex items-center gap-4 p-6 transition-colors hover:border-primary"
            >
              <MessageCircle className="size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-sm">WhatsApp</span>
                <span className="block truncate text-sm text-muted-foreground">{SITE.phone}</span>
              </span>
            </a>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="card-luxe flex items-center gap-4 p-6 transition-colors hover:border-primary"
            >
              <Phone className="size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-sm">Call</span>
                <span className="block truncate text-sm text-muted-foreground">{SITE.phone}</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="card-luxe flex items-center gap-4 p-6 transition-colors hover:border-primary"
            >
              <Mail className="size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-sm">Email</span>
                <span className="block truncate text-sm text-muted-foreground">{SITE.email}</span>
              </span>
            </a>
            <div className="card-luxe flex items-center gap-4 p-6">
              <Clock className="size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-sm">Opening hours</span>
                <span className="block text-sm text-muted-foreground">{SITE.hours}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={SITE.social.instagram.url} target="_blank" rel="noopener noreferrer">
                  <Instagram /> {SITE.social.instagram.handle}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.social.tiktok.url} target="_blank" rel="noopener noreferrer">
                  <Music2 /> {SITE.social.tiktok.handle}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.social.facebook.url} target="_blank" rel="noopener noreferrer">
                  <Facebook /> Facebook
                </a>
              </Button>
            </div>
          </div>

          <div className="card-luxe p-7">
            <h2 className="font-display text-2xl">Send an enquiry</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Fill in your details and choose whether to send it through WhatsApp or email. If you're
              signed in, the enquiry is saved to your account so you can track it.
            </p>
            <Button size="lg" className="mt-6 w-full" onClick={() => setOpen(true)}>
              <MessageCircle /> Start an enquiry
            </Button>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              We deliver products worldwide. Installation and full project execution are available
              within Nigeria.
            </p>
          </div>
        </div>
      </Section>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        kind="general"
        title="General enquiry"
        description="Tell us what you need and how to reach you."
        notesLabel="Your message"
        emailSubject="Website enquiry"
        buildLines={(values) =>
          ["I would like to make an enquiry.", values.notes ? `Message: ${values.notes}` : ""].filter(
            Boolean,
          )
        }
      />
    </>
  );
}
