import { NextResponse } from "next/server";
import { z } from "zod";

// Contact submissions are delivered by email via Web3Forms (https://web3forms.com).
// There is no database: the API route validates and rate-limits the request, then
// forwards it to Web3Forms, which emails the submission to the address tied to the
// access key.
//
// Web3Forms access keys are designed to be public — their own recommended
// integration embeds the key in the client-side bundle — so the default below is
// safe to commit and lets the form work with no extra configuration. To rotate
// the key (e.g. if it gets abused), generate a new one in the Web3Forms dashboard
// and set WEB3FORMS_ACCESS_KEY in Vercel → Settings → Environment Variables; the
// env var overrides the default with no code change.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const DEFAULT_WEB3FORMS_ACCESS_KEY = "96d7226e-42ac-4afb-80c3-a51bd290a3aa";

/** Collapse newlines so user input can't inject headers into the email subject. */
function singleLine(value: unknown): string {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .slice(0, 200);
}

/** Validated, length-capped shape of a contact submission. */
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z
    .string()
    .trim()
    .min(3)
    .max(200)
    .refine((v) => /.+@.+\..+/.test(v), "A valid email is required."),
  phone: z.string().trim().max(50).optional(),
  inquiryType: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required.").max(5000),
});

// Best-effort in-memory rate limit (per server instance). Durable, multi-instance
// limiting (e.g. on serverless) needs an external store such as Upstash/Redis.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentHitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentHitsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  hits.push(now);
  recentHitsByIp.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a little while." },
        { status: 429 },
      );
    }

    // ── Validate input (rejects oversized / malformed payloads) ───────
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your entries and try again." },
        { status: 400 },
      );
    }
    const { name, email, phone, inquiryType, message } = parsed.data;

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY;

    // ── Forward to Web3Forms, which emails the submission ─────────────
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Inquiry: ${singleLine(inquiryType ?? "General")} from ${singleLine(name)}`,
        from_name: "SouthStar Charters Website",
        // Lets you hit "Reply" in your inbox to answer the customer directly.
        replyto: email,
        name,
        email,
        phone: phone ?? "Not provided",
        inquiry_type: inquiryType ?? "Not specified",
        message,
      }),
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!response.ok || !result?.success) {
      console.error(
        "Web3Forms submission failed:",
        response.status,
        result?.message ?? "no response body",
      );
      return NextResponse.json(
        { error: "An unexpected error occurred. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
