export const SITE = {
  name: "Reno Luxe & Interior",
  shortName: "Reno Luxe",
  tagline: "…beyond renovation, into luxury",
  ceo: "Ebube Evaristus Agbodike",
  credential: "Certified in Interior Design and Decor",
  email: "renoluxeandinterior.info@gmail.com",
  phone: "07059399159",
  phoneIntl: "+2347059399159",
  whatsappNumber: "2347059399159",
  hours: "Every day · 8:00 AM – 10:00 PM",
  social: {
    instagram: { handle: "@reno_luxee", url: "https://www.instagram.com/reno_luxee" },
    tiktok: { handle: "@reno_luxe3", url: "https://www.tiktok.com/@reno_luxe3" },
    facebook: { handle: "Reno Luxe", url: "https://www.facebook.com/profile.php?id=Reno+Luxe" },
    whatsapp: { handle: "07059399159", url: "https://wa.me/2347059399159" },
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openWhatsApp(message: string) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

export function openEmail(subject: string, body: string) {
  window.location.href = mailtoLink(subject, body);
}

export const ENQUIRY_STATUSES = [
  "New Request",
  "Received",
  "Reviewing",
  "Quote/Discussion",
  "In Progress",
  "Completed",
  "Closed",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export function buildMessage(lines: (string | false | null | undefined)[]) {
  return lines.filter(Boolean).join("\n");
}
