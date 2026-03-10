"use client";

import { useState, type FormEvent } from "react";

const INQUIRY_OPTIONS = [
  "Harbor Tour",
  "Fishing Charter",
  "Spearfishing / Dive Charter",
  "Private Event",
  "General Question",
] as const;

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

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      inquiryType: (formData.get("inquiryType") as string) || undefined,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setFormState({
        status: "success",
        message:
          "Thank you! Your message has been sent. We will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
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
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
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
      {formState.status === "success" && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-200">
          {formState.message}
        </div>
      )}
      {formState.status === "error" && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
          {formState.message}
        </div>
      )}

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
