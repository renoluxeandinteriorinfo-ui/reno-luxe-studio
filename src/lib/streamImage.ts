/**
 * Streams an image generation from the app's server route, invoking `onFrame`
 * for each partial frame and once more for the final image.
 */
export async function streamImage(
  endpoint: string,
  prompt: string,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
): Promise<void> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok || !res.body) {
    throw new Error((await res.text().catch(() => "")) || `Image generation failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let events = 0;

  const handlePayload = (raw: string) => {
    if (!raw || raw === "[DONE]") return;
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    const type = String(payload["type"] ?? "");
    const b64 =
      (payload["b64_json"] as string | undefined) ??
      (payload["image"] as string | undefined) ??
      ((payload["data"] as { b64_json?: string }[] | undefined)?.[0]?.b64_json ?? undefined);
    if (!b64) return;
    events += 1;
    onFrame(`data:image/png;base64,${b64}`, type.endsWith("completed") || type === "");
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      for (const line of chunk.split("\n")) {
        if (line.startsWith("data:")) handlePayload(line.slice(5).trim());
      }
    }
  }

  if (events > 0) return;

  // Zero-event stream: replay once without streaming.
  const fallback = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, stream: false }),
  });
  if (!fallback.ok) {
    throw new Error((await fallback.text().catch(() => "")) || "Image generation failed");
  }
  const json = (await fallback.json()) as {
    data?: { b64_json?: string }[];
    choices?: { message?: { images?: { image_url?: { url?: string } }[] } }[];
  };
  const b64 = json.data?.[0]?.b64_json;
  const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (b64) onFrame(`data:image/png;base64,${b64}`, true);
  else if (url) onFrame(url, true);
  else throw new Error("No image was returned. Please try again.");
}
