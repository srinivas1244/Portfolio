import { NextResponse } from "next/server";

/**
 * Contact endpoint. Validates input and — if CONTACT_WEBHOOK_URL is set
 * (e.g. a Discord/Slack/Make webhook) — forwards the message. Without it,
 * the form still succeeds gracefully so the UX never breaks.
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  // Honeypot — bots fill hidden fields.
  if (body.company) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📬 New portfolio message\nFrom: ${name} <${email}>\n\n${message}`,
        }),
      });
    } catch {
      // Don't fail the user's submission if the webhook is down.
    }
  }

  return NextResponse.json({ ok: true });
}
