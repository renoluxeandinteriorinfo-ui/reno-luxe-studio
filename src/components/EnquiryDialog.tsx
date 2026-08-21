import { useEffect, useState, type ReactNode } from "react";
import { MessageCircle, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { recordEnquiry, type EnquiryKind } from "@/lib/enquiries";
import { SITE, buildMessage, openEmail, openWhatsApp } from "@/lib/site";

export type EnquiryValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  address: string;
  quantity: string;
  notes: string;
};

const EMPTY: EnquiryValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  area: "",
  address: "",
  quantity: "1",
  notes: "",
};

export type EnquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kind: EnquiryKind;
  reference?: string | undefined;
  title: string;
  description?: string | undefined;
  withQuantity?: boolean | undefined;
  notesLabel?: string | undefined;
  extra?: ReactNode | undefined;
  buildLines: (values: EnquiryValues) => string[];
  emailSubject: string;
};

export function EnquiryDialog({
  open,
  onOpenChange,
  kind,
  reference,
  title,
  description,
  withQuantity = false,
  notesLabel = "Additional notes",
  extra,
  buildLines,
  emailSubject,
}: EnquiryDialogProps) {
  const { user } = useAuth();
  const [values, setValues] = useState<EnquiryValues>(EMPTY);
  const [busy, setBusy] = useState<"whatsapp" | "email" | null>(null);

  useEffect(() => {
    if (!open || !user) return;
    let active = true;
    supabase
      .from("profiles")
      .select("full_name,email,phone,country,city,area,address")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active || !data) return;
        setValues((prev) => ({
          ...prev,
          name: prev.name || data.full_name || "",
          email: prev.email || data.email || user.email || "",
          phone: prev.phone || data.phone || "",
          country: prev.country || data.country || "",
          city: prev.city || data.city || "",
          area: prev.area || data.area || "",
          address: prev.address || data.address || "",
        }));
      });
    return () => {
      active = false;
    };
  }, [open, user]);

  const set = (key: keyof EnquiryValues) => (event: { target: { value: string } }) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  async function submit(channel: "whatsapp" | "email") {
    if (!values.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!values.country.trim() || !values.city.trim()) {
      toast.error("Please enter your country and city — we deliver worldwide");
      return;
    }

    setBusy(channel);
    const lines = buildLines(values);
    const message = buildMessage([
      `Hello ${SITE.name},`,
      "",
      ...lines,
      "",
      `Name: ${values.name}`,
      values.email && `Email: ${values.email}`,
      values.phone && `Phone / WhatsApp: ${values.phone}`,
      `Location: ${[values.area, values.city, values.country].filter(Boolean).join(", ")}`,
      values.address && `Delivery address: ${values.address}`,
      values.notes && `Notes: ${values.notes}`,
    ]);

    const result = await recordEnquiry({
      kind,
      reference,
      name: values.name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      city: values.city,
      area: values.area,
      message,
      details: { channel, quantity: withQuantity ? values.quantity : undefined, notes: values.notes },
    });

    if (channel === "whatsapp") openWhatsApp(message);
    else openEmail(emailSubject, message);

    setBusy(null);
    onOpenChange(false);
    toast.success(
      result.stored
        ? "Enquiry saved to your account and opened for sending"
        : "Your message is ready to send",
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <div className="grid gap-4">
          {extra}
          <div className="grid gap-2">
            <Label htmlFor="eq-name">Full name *</Label>
            <Input id="eq-name" value={values.name} onChange={set("name")} placeholder="Your name" />
          </div>
          {withQuantity ? (
            <div className="grid gap-2">
              <Label htmlFor="eq-qty">Quantity</Label>
              <Input
                id="eq-qty"
                type="number"
                min={1}
                value={values.quantity}
                onChange={set("quantity")}
              />
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="eq-country">Country *</Label>
              <Input id="eq-country" value={values.country} onChange={set("country")} placeholder="Nigeria" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eq-city">City *</Label>
              <Input id="eq-city" value={values.city} onChange={set("city")} placeholder="Lagos" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eq-area">Area</Label>
            <Input id="eq-area" value={values.area} onChange={set("area")} placeholder="Lekki Phase 1" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="eq-email">Email</Label>
              <Input id="eq-email" type="email" value={values.email} onChange={set("email")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eq-phone">Phone / WhatsApp</Label>
              <Input id="eq-phone" value={values.phone} onChange={set("phone")} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eq-address">Delivery address (optional)</Label>
            <Input id="eq-address" value={values.address} onChange={set("address")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eq-notes">{notesLabel}</Label>
            <Textarea id="eq-notes" rows={3} value={values.notes} onChange={set("notes")} />
          </div>
        </div>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <Button onClick={() => submit("whatsapp")} disabled={busy !== null}>
            {busy === "whatsapp" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <MessageCircle />
            )}
            Send on WhatsApp
          </Button>
          <Button variant="outline" onClick={() => submit("email")} disabled={busy !== null}>
            {busy === "email" ? <Loader2 className="animate-spin" /> : <Mail />}
            Send by email
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Pricing, delivery charges, timelines and any customs requirements are confirmed during the
          enquiry, based on your destination and the items involved.
        </p>
      </DialogContent>
    </Dialog>
  );
}
