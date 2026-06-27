import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";

// Lazily initialize Resend so the build does not fail when the
// RESEND_API_KEY env var is not yet set.
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/** Escape user input before embedding it in the notification email HTML. */
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapse newlines so user input can't inject headers into the email subject. */
function singleLine(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").slice(0, 200);
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
        { status: 429 }
      );
    }

    // ── Validate input (rejects oversized / malformed payloads) ───────
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your entries and try again." },
        { status: 400 }
      );
    }
    const { name, email, phone, inquiryType, message } = parsed.data;

    // ── Save lead to Neon Postgres ────────────────────────────────────
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        inquiryType: inquiryType ?? null,
        message,
        source: "Contact Form",
      },
    });

    // ── Send email notification via Resend ────────────────────────────
    const resend = getResend();
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (resend && notificationEmail) {
      await resend.emails.send({
        from: `SouthStar Charters <${fromEmail}>`,
        to: [notificationEmail],
        subject: `New Inquiry: ${singleLine(inquiryType ?? "General")} from ${singleLine(name)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(phone ?? "Not provided")}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Inquiry Type</td><td style="padding:8px;">${escapeHtml(inquiryType ?? "Not specified")}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:12px;color:#666;">Lead ID: ${escapeHtml(lead.id)}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
