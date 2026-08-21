import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavourites, useToggleFavourite, type FavouriteType } from "@/lib/favourites";

export function FavouriteButton({
  itemType,
  itemId,
  title,
  imageUrl,
  className,
  withLabel = false,
}: {
  itemType: FavouriteType;
  itemId: string;
  title: string;
  imageUrl?: string | null;
  className?: string;
  withLabel?: boolean;
}) {
  const { data } = useFavourites();
  const toggle = useToggleFavourite();
  const saved = !!data?.some((f) => f.item_type === itemType && f.item_id === itemId);

  return (
    <Button
      type="button"
      variant={withLabel ? "outline" : "ghost"}
      size={withLabel ? "default" : "icon"}
      aria-label={saved ? `Remove ${title} from favourites` : `Save ${title} to favourites`}
      className={cn(
        !withLabel && "bg-background/70 backdrop-blur-sm hover:bg-background/90",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle.mutate({ item_type: itemType, item_id: itemId, title, image_url: imageUrl });
      }}
      disabled={toggle.isPending}
    >
      <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
      {withLabel ? (saved ? "Saved" : "Save") : null}
    </Button>
  );
}
