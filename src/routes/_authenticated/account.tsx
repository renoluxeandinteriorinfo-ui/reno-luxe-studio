import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero, Section } from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/account")({
  head: () =>
    pageMeta(
      "My Account",
      "Manage your Reno Luxe & Interior profile, delivery details and saved preferences.",
    ),
  component: Account,
});

type ProfileForm = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  address: string;
};

const EMPTY: ProfileForm = {
  full_name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  area: "",
  address: "",
};

function Account() {
  const { user, signOut } = useAuth();
  const [form, setForm] = useState<ProfileForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name,email,phone,country,city,area,address")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      setForm({
        full_name: data?.full_name ?? "",
        email: data?.email ?? user.email ?? "",
        phone: data?.phone ?? "",
        country: data?.country ?? "",
        city: data?.city ?? "",
        area: data?.area ?? "",
        address: data?.address ?? "",
      });
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...form }, { onConflict: "id" });
      if (error) throw error;
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your profile");
    } finally {
      setSaving(false);
    }
  }

  const field = (key: keyof ProfileForm, label: string, placeholder?: string) => (
    <div className="grid gap-2">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        value={form[key]}
        placeholder={placeholder ?? ""}
        onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <>
      <PageHero
        overline="My account"
        title="Your details"
        lead="Keep your contact and delivery details up to date so every enquiry reaches us complete."
      />

      <Section>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="card-luxe grid gap-5 p-7">
              {field("full_name", "Full name")}
              {field("email", "Email")}
              {field("phone", "Phone / WhatsApp")}
              <div className="grid gap-5 sm:grid-cols-3">
                {field("country", "Country")}
                {field("city", "City")}
                {field("area", "Area")}
              </div>
              {field("address", "Delivery address")}
              <Button size="lg" onClick={save} disabled={saving}>
                {saving ? <Loader2 className="animate-spin" /> : null}
                Save changes
              </Button>
            </div>

            <div className="card-luxe h-fit grid gap-3 p-7">
              <p className="overline text-primary">Quick links</p>
              <Button asChild variant="outline">
                <Link to="/favourites">My favourites</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/enquiries">My enquiries</Link>
              </Button>
              <Button variant="ghost" onClick={() => void signOut()}>
                <LogOut /> Sign out
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
