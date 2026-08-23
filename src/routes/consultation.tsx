import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero, Section, SectionHeading } from "@/components/Section";
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
  component: Consultation;
});

function Consultation() {
  return null;
}
