"use client";

import { useState, type FormEvent } from "react";

const INQUIRY_OPTIONS = [
  "Harbor Tour",
  "Fishing Charter",
  "Spearfishing / Dive Charter",
  "Private Event",
  "General Question",
] as const;

// Submissions are emailed via Web3Forms (https://web3forms.com). The free plan
// only accepts submissions from the browser (server-side POSTs are rejected), so
// the form posts directly to Web3Forms from the client. Web3Forms access keys are
// designed to be public, so committing the default below is safe and lets the form
// work with no configuration. To rotate the key, set
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel (it's inlined at build time).
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "96d7226e-42ac-4afb-80c3-a51bd290a3aa";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: "submitting", message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "Not provided";
    const inquiryType =
      (formData.get("inquiryType") as string) || "Not specified";
    const message = (formData.get("message") as string) || "";

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      from_name: "SouthStar Charters Website",
      // Lets you hit "Reply" in your inbox to answer the customer directly.
      replyto: email,
      // Honeypot: a real user never fills this hidden field; bots that do are
      // rejected by Web3Forms.
      botcheck: Boolean(formData.get("botcheck")),
      name,
      email,
      phone,
      "Inquiry Type": inquiryType,
      message,
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!res.ok || !data?.success) {
        console.error(
          "Web3Forms submission failed:",
          res.status,
          data?.message ?? "no response body",
        );
        throw new Error("Something went wrong. Please try again.");
      }

      setFormState({
        status: "success",
        message:
          "Thank you! Your message has been sent. We will get back to you shortly.",
      });
      form.reset();
    } catch (err) {
      setFormState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot anti-spam field — hidden from real users */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="you@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="(555) 555-5555"
        />
      </div>

      {/* Inquiry Type */}
      <div>
        <label
          htmlFor="inquiryType"
          className="block text-sm font-medium text-slate-700"
        >
          What are you interested in?
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        >
          <option value="">Select an option</option>
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="Tell us about your trip or ask a question..."
        />
      </div>

      {/* Status Messages */}
      <div aria-live="polite" aria-atomic="true">
        {formState.status === "success" && (
          <div
            role="status"
            className="rounded-md bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-200"
          >
            {formState.message}
          </div>
        )}
        {formState.status === "error" && (
          <div
            role="alert"
            className="rounded-md bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200"
          >
            {formState.message}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formState.status === "submitting"}
        className="w-full rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50"
      >
        {formState.status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
