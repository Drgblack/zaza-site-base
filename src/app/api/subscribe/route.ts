export const runtime = "nodejs"; // ensure Node runtime locally & on Vercel

type SubscribeBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  source?: string;
  tags?: string[];
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubscribeBody;
    const email = body.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { ok: false, error: "Invalid email" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      return json(500, { ok: false, error: "Server not configured" });
    }

    // Build payload
    const payload: any = {
      email,
      updateEnabled: true,
      listIds: [Number(listId)],
      attributes: {},
    };
    if (body.firstName) payload.attributes.FIRSTNAME = body.firstName;
    if (body.lastName) payload.attributes.LASTNAME = body.lastName;
    if (body.name) payload.attributes.NAME = body.name;
    if (body.source) payload.attributes.SOURCE = body.source;
    if (Array.isArray(body.tags) && body.tags.length) payload.attributes.TAGS = body.tags;

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    if (res.ok) {
      return json(200, { ok: true, brevoStatus: res.status });
    }

    // Log to server console for local debugging
    console.error("Brevo error", { status: res.status, text });

    // Return everything we can to the client for diagnosis
    return json(400, {
      ok: false,
      error: "Brevo error",
      status: res.status,
      detail: text || null,
      sent: payload,
    });
  } catch (err: any) {
    console.error("Subscribe unexpected error", err);
    return json(500, { ok: false, error: "Unexpected error" });
  }
}

// Optional: help diagnose GETs during testing
export async function GET() {
  return json(405, { ok: false, error: "Method not allowed" });
}
