import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta(
      "Privacy Policy",
      "How Reno Luxe & Interior collects, uses and protects the personal information you share through the website.",
    ),
  component: Privacy,
});

const SECTIONS = [
  [
    "Information we collect",
    "We collect the details you give us: your name, email address, phone number, delivery location and the content of your enquiries. If you create an account, we also store your saved favourites and the enquiries linked to your account.",
  ],
  [
    "How we use it",
    "Your information is used to respond to enquiries, prepare quotations, arrange delivery and installation, and keep a record of your requests in your account. We do not sell your information.",
  ],
  [
    "Visualization uploads",
    "Images you upload or generate in the Visualize Your Space tool are stored privately and are only accessible to you and our team. They are used to understand your space and prepare design suggestions.",
  ],
  [
    "Sharing",
    "We share only what is necessary with delivery and logistics partners to fulfil your order. We may share details with installation teams where on-site work is agreed.",
  ],
  [
    "Data retention",
    "Enquiry records and account data are kept while your account is active, and afterwards only where needed for our records or legal obligations.",
  ],
  [
    "Your choices",
    "You can request a copy of your data, ask us to correct it, or ask us to delete your account and associated records at any time.",
  ],
];

function Privacy() {
  return (
    <>
      <PageHero
        overline="Legal"
        title="Privacy policy"
        lead="How we handle the information you share with us."
      />
      <Section>
        <div className="grid max-w-3xl gap-8">
          {SECTIONS.map(([title, body]) => (
            <article key={title}>
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
          <p className="text-sm leading-relaxed text-muted-foreground">
            Questions about this policy? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
