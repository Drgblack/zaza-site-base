export const runtime = "nodejs"; // ensures Node runtime on Vercel

type SubscribeBody = { email?: string };

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as SubscribeBody;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { ok: false, error: "Invalid email" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      // Don’t leak secrets—just indicate misconfig
      return json(500, { ok: false, error: "Server not configured" });
    }

    // Upsert contact and add to list
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (res.status === 201 || res.status === 200) {
      return json(200, { ok: true });
    }

    // Handle known Brevo errors
    const text = await res.text();
    return json(400, { ok: false, error: "Brevo error", detail: text });
  } catch (err) {
    return json(500, { ok: false, error: "Unexpected error" });
  }
}
