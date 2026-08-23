import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Heart, ClipboardList, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section, PageHero } from "@/components/Section";
import { BRAND_IMAGES } from "@/lib/catalog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { pageMeta } from "@/lib/seo";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({ head: () => pageMeta("My Account", "Manage your Reno Luxe & Interior profile, favourites and enquiries."), component: Account });

function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone ?? "");

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) { toast.error("Could not sign out. Please try again."); return; }
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  if (!user) return <Section className="min-h-[65vh]"><div className="card-luxe mx-auto max-w-lg p-8"><p className="overline text-primary">Account</p><h1 className="mt-3 font-display text-3xl">Your account</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sign in to manage your profile, saved pieces and enquiry history. Account data is only available after real authentication is connected.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild><Link to="/login">Sign in</Link></Button><Button asChild variant="outline"><Link to="/signup">Create an account</Link></Button></div></div></Section>;

  return <><PageHero overline="Account" title="Your Reno Luxe account" lead="Keep your details ready and follow your conversations with Reno Luxe & Interior." image={BRAND_IMAGES.cover} /><Section><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="card-luxe p-6"><div className="flex items-center gap-3"><UserRound className="text-primary" /><div><h2 className="font-display text-2xl">Profile</h2><p className="text-sm text-muted-foreground">{user.email}</p></div></div><div className="mt-6 grid gap-4"><div className="grid gap-2"><Label htmlFor="account-name">Full name</Label><Input id="account-name" value={name} onChange={(e) => setName(e.target.value)} /></div><div className="grid gap-2"><Label htmlFor="account-phone">Phone / WhatsApp</Label><Input id="account-phone" value={phone} onChange={(e) => setPhone(e.target.value)} /></div><p className="text-xs leading-relaxed text-muted-foreground">Profile editing will be enabled when the connected account data service is available.</p></div></div><div className="grid gap-3"><Link to="/favourites" className="card-luxe flex items-center gap-4 p-5 transition-colors hover:border-primary"><Heart className="text-primary" /><span><strong className="block">Saved / Favourites</strong><span className="text-sm text-muted-foreground">Your saved products and projects</span></span></Link><Link to="/enquiries" className="card-luxe flex items-center gap-4 p-5 transition-colors hover:border-primary"><ClipboardList className="text-primary" /><span><strong className="block">My Enquiries / Projects</strong><span className="text-sm text-muted-foreground">Track conversations and enquiry status</span></span></Link><Button variant="outline" onClick={logout} className="justify-start"><LogOut /> Sign out</Button></div></div></Section></>;
}
