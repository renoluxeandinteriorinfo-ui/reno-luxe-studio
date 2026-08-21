import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type FavouriteType = "product" | "project" | "concept";

export type Favourite = {
  id: string;
  item_type: FavouriteType;
  item_id: string;
  title: string;
  image_url: string | null;
  created_at: string;
};

export function useFavourites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favourites", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Favourite[]> => {
      const { data, error } = await supabase
        .from("favourites")
        .select("id,item_type,item_id,title,image_url,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Favourite[];
    },
  });
}

export function useToggleFavourite() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (item: {
      item_type: FavouriteType;
      item_id: string;
      title: string;
      image_url?: string | null;
    }) => {
      if (!user) throw new Error("not-signed-in");
      const { data: existing } = await supabase
        .from("favourites")
        .select("id")
        .eq("item_type", item.item_type)
        .eq("item_id", item.item_id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase.from("favourites").delete().eq("id", existing.id);
        if (error) throw error;
        return "removed" as const;
      }
      const { error } = await supabase.from("favourites").insert({
        user_id: user.id,
        item_type: item.item_type,
        item_id: item.item_id,
        title: item.title,
        image_url: item.image_url ?? null,
      });
      if (error) throw error;
      return "saved" as const;
    },
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["favourites"] });
      toast.success(result === "saved" ? "Saved to your favourites" : "Removed from favourites");
    },
    onError: (error: Error) => {
      if (error.message === "not-signed-in") {
        toast.error("Sign in to save favourites");
        return;
      }
      toast.error(error.message);
    },
  });
}
