import { NextRequest, NextResponse } from "next/server";
import { getContactEmail, getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      suburbState,
      backyardSize,
      interests,
      ownerStatus,
      paymentPreference,
      message,
    } = body;

    if (!fullName || !email || !suburbState) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const sizeLabels: Record<string, string> = {
      "under-200": "Under 200m²",
      "200-500": "200 – 500m²",
      "500-quarter-acre": "500m² – ¼ acre",
      "quarter-acre-plus": "¼ acre or more",
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 32px; border-radius: 12px;">
        <h1 style="color: #1a1a0e; font-family: Georgia, serif; margin-bottom: 4px;">New Enquiry 🌱</h1>
        <p style="color: #6b4c2a; margin-top: 0; margin-bottom: 24px;">Micro Farms Australia — Contact Form</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold; width: 40%;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${fullName}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${phone || "—"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Location</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${suburbState}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Backyard Size</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${sizeLabels[backyardSize] || backyardSize}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Interests</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${interests?.join(", ") || "—"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Owner Status</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${ownerStatus || "—"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Payment Pref.</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${paymentPreference || "—"}</td></tr>
        </table>

        ${
          message
            ? `<div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #8aab4a;">
          <p style="color: #6b4c2a; font-weight: bold; margin: 0 0 8px;">Message:</p>
          <p style="color: #1a1a0e; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>`
            : ""
        }

        <p style="margin-top: 24px; color: #6b4c2a; font-size: 12px;">Sent via Micro Farms Australia contact form</p>
      </div>
    `;

    await getResend().emails.send({
      from: "Micro Farms Australia <onboarding@resend.dev>",
      to: [getContactEmail()],
      replyTo: email,
      subject: `New Enquiry from ${fullName} — Micro Farms Australia`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
