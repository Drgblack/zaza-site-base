export const runtime = "nodejs";

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

    const payload: Record<string, unknown> = {
      email,
      updateEnabled: true,
      listIds: [Number(listId)],
      attributes: {},
    };
    if (body.firstName) (payload.attributes as Record<string, unknown>).FIRSTNAME = body.firstName;
    if (body.lastName)  (payload.attributes as Record<string, unknown>).LASTNAME  = body.lastName;
    if (body.name)      (payload.attributes as Record<string, unknown>).NAME      = body.name;
    if (body.source)    (payload.attributes as Record<string, unknown>).SOURCE    = body.source;
    if (Array.isArray(body.tags) && body.tags.length)
      (payload.attributes as Record<string, unknown>).TAGS = body.tags;

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": apiKey },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    if (res.ok) {
      return json(200, { ok: true, brevoStatus: res.status });
    }

    console.error("Brevo error", { status: res.status, text });
    return json(400, { ok: false, error: "Brevo error", status: res.status, detail: text || null, sent: payload });
  } catch (_err) {
    console.error("Subscribe unexpected error");
    return json(500, { ok: false, error: "Unexpected error" });
  }
}

export async function GET() {
  return json(405, { ok: false, error: "Method not allowed" });
}
