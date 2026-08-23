import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/Section";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageMeta(
      "Frequently Asked Questions",
      "Answers about pricing, delivery, installation, timelines, consultations and ordering from Reno Luxe & Interior.",
    ),
  component: Faq,
});

const FAQS = [
  [
    "How do I place an order?",
    "Browse the catalogue, open any product and send an enquiry. Your message opens in WhatsApp or your email app with the product details already filled in. We then confirm price, availability and delivery.",
  ],
  [
    "Why are prices not shown on the website?",
    "Pricing depends on quantity, finish, current availability and your delivery destination. We confirm exact pricing during your enquiry so there are no surprises.",
  ],
  [
    "Do you deliver outside Nigeria?",
    "Yes. Products are delivered worldwide. Shipping cost and timeline depend on the items and destination and are confirmed before dispatch. Installation is available within Nigeria only.",
  ],
  [
    "Do you handle full renovations?",
    "Yes. Luxury home renovation, space planning, execution and final styling are all part of our services, carried out within Nigeria.",
  ],
  [
    "How long does a project take?",
    "It depends on scope. A décor-only styling can be completed quickly, while a full house transformation runs over several weeks. We give you a timeline after the consultation.",
  ],
  [
    "Can you work with my existing furniture?",
    "Yes. Many projects combine existing pieces with new additions. We assess what to keep, restyle or replace during the consultation.",
  ],
  [
    "What is the Visualize Your Space tool?",
    "It generates a conceptual image of how your space could look based on your description and chosen style. It is an inspiration tool — the final design is developed with our team.",
  ],
  [
    "Do I need an account?",
    "No, you can enquire as a guest. An account lets you save favourites, track your enquiries and keep your details ready for next time.",
  ],
];

function Faq() {
  return (
    <>
      <PageHero
        overline="FAQ"
        title="Frequently asked questions"
        lead={`Can't find your answer? Message us on WhatsApp — ${SITE.hours.toLowerCase()}.`}
      />

      <Section>
        <Accordion type="single" collapsible className="max-w-3xl">
          {FAQS.map(([question, answer]) => (
            <AccordionItem key={question} value={question as string}>
              <AccordionTrigger className="text-left text-base">{question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button asChild className="mt-10">
          <Link to="/contact">Ask us a question</Link>
        </Button>
      </Section>
    </>
  );
}
