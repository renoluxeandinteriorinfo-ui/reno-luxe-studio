import { supabase } from "@/integrations/supabase/client";

export type EnquiryKind =
  "product" | "project" | "consultation" | "package" | "service" | "custom" | "viju" | "general";

export type EnquiryInput = {
  kind: EnquiryKind;
  reference?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  country?: string | undefined;
  city?: string | undefined;
  area?: string | undefined;
  message?: string | undefined;
  details?: Record<string, unknown> | undefined;
};

/**
 * Stores the enquiry against the signed-in customer so it appears in their
 * dashboard. Guests can still send the WhatsApp/email message — nothing is
 * stored for them.
 */
export async function recordEnquiry(input: EnquiryInput) {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { stored: false as const };

  const { error } = await supabase.from("enquiries").insert({
    user_id: user.id,
    kind: input.kind,
    reference: input.reference ?? null,
    name: input.name ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    country: input.country ?? null,
    city: input.city ?? null,
    area: input.area ?? null,
    message: input.message ?? null,
    details: (input.details ?? {}) as never,
    status: "New Request",
  });

  if (error) return { stored: false as const, error: error.message };
  return { stored: true as const };
}
