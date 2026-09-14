import { Resend } from "resend";

/** Lazy so `next build` can collect page data without RESEND_API_KEY. */
export function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }
  return new Resend(apiKey);
}

export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL || "thwilliamsbooks@gmail.com";
}
