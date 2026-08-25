import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/visualizations/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        // Only allow simple "<uid>/<file>.jpg|.png" style paths.
        if (!/^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+\.(jpg|jpeg|png)$/i.test(path)) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("visualizations").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        const contentType = /\.png$/i.test(path) ? "image/png" : "image/jpeg";
        return new Response(await data.arrayBuffer(), {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
