import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Lazily initialize Resend so the build does not fail when the
// RESEND_API_KEY env var is not yet set.
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, message } = body;

    // ── Basic validation ──────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

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
        subject: `New Inquiry: ${inquiryType ?? "General"} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone ?? "Not provided"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Inquiry Type</td><td style="padding:8px;">${inquiryType ?? "Not specified"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:12px;color:#666;">Lead ID: ${lead.id}</p>
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
