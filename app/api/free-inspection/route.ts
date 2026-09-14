import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { saveLead } from "@/lib/leads";

const resend = new Resend(process.env.RESEND_API_KEY);

const sizeLabels: Record<string, string> = {
  "under-200": "Under 200m²",
  "200-500": "200 – 500m²",
  "500-quarter-acre": "500m² – ¼ acre",
  "quarter-acre-plus": "¼ acre or more",
};

const packageLabels: Record<string, string> = {
  "buy-outright": "Buy Outright",
  "payment-plan": "Payment Plan",
  rental: "Rental",
  "not-sure": "Not sure yet",
};

const timeLabels: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  anytime: "Anytime",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      suburb,
      backyardSize,
      interests,
      ownerStatus,
      packagePreference,
      bestTimeToContact,
      message,
    } = body;

    if (!fullName || !email || !phone || !suburb || !backyardSize || !ownerStatus) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const interestList: string[] = Array.isArray(interests) ? interests : [];

    const lead = await saveLead({
      fullName,
      email,
      phone,
      suburb,
      backyardSize,
      interests: interestList,
      ownerStatus,
      packagePreference: packagePreference || "",
      bestTimeToContact: bestTimeToContact || "",
      message: message || "",
    });

    const sizeLabel = sizeLabels[backyardSize] || backyardSize;
    const packageLabel = packagePreference
      ? packageLabels[packagePreference] || packagePreference
      : "—";
    const timeLabel = bestTimeToContact
      ? timeLabels[bestTimeToContact] || bestTimeToContact
      : "—";
    const interestsLabel = interestList.length ? interestList.join(", ") : "—";

    // Notification email to the business owner
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 32px; border-radius: 12px;">
        <h1 style="color: #1a1a0e; font-family: Georgia, serif; margin-bottom: 4px;">New Free Inspection Request 🌱</h1>
        <p style="color: #6b4c2a; margin-top: 0; margin-bottom: 24px;">Micro Farms Australia — /free-inspection</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold; width: 40%;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${fullName}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${phone}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Suburb</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${suburb}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Backyard Size</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${sizeLabel}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Interested In</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${interestsLabel}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Renting / Homeowner</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${ownerStatus}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Preferred Package</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${packageLabel}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40; color: #6b4c2a; font-weight: bold;">Best Time to Contact</td><td style="padding: 10px 0; border-bottom: 1px solid #c8842a40;">${timeLabel}</td></tr>
        </table>

        ${
          message
            ? `<div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #8aab4a;">
          <p style="color: #6b4c2a; font-weight: bold; margin: 0 0 8px;">Anything else:</p>
          <p style="color: #1a1a0e; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>`
            : ""
        }

        <p style="margin-top: 24px; color: #6b4c2a; font-size: 12px;">Lead ID ${lead.id} — submitted ${new Date(
      lead.submittedAt
    ).toLocaleString("en-AU")}</p>
      </div>
    `;

    // Confirmation email to the customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF6EE; padding: 40px 32px; border-radius: 12px;">
        <h1 style="color: #3D2B1F; font-family: Georgia, serif; font-weight: 400; margin-bottom: 8px;">You&rsquo;re booked in, ${fullName.split(" ")[0]}! 🌱</h1>
        <p style="color: #8B6F47; font-size: 15px; line-height: 1.7; margin-top: 0;">
          Thanks for requesting your free backyard assessment. We&rsquo;ve received your
          details for <strong>${suburb}</strong> and one of our team will be in touch
          within <strong>24 hours</strong> to book your visit.
        </p>

        <div style="background: #ffffff; border-radius: 10px; padding: 24px; margin: 28px 0; border: 1px solid #E8DCC8;">
          <p style="color: #3D2B1F; font-weight: bold; margin: 0 0 12px; font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase;">What happens next</p>
          <p style="color: #3D2B1F; margin: 0 0 10px; font-size: 14px; line-height: 1.7;">1. We&rsquo;ll call or email to book a time that suits you.</p>
          <p style="color: #3D2B1F; margin: 0 0 10px; font-size: 14px; line-height: 1.7;">2. We visit (or assess remotely) and take a proper look at your space.</p>
          <p style="color: #3D2B1F; margin: 0; font-size: 14px; line-height: 1.7;">3. We design your perfect micro farm and send you a no-obligation quote.</p>
        </div>

        <p style="color: #8B6F47; font-size: 13px; line-height: 1.7;">
          No pressure, no obligation — just a friendly chat about what&rsquo;s possible
          in your backyard.
        </p>

        <p style="color: #3D2B1F; font-size: 14px; margin-top: 28px;">See you soon,<br/>The Micro Farms Australia team</p>
      </div>
    `;

    await Promise.all([
      resend.emails.send({
        from: "Micro Farms Australia <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL || "thwilliamsbooks@gmail.com"],
        replyTo: email,
        subject: `🌱 New Inspection Request — ${fullName}, ${suburb}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: "Micro Farms Australia <onboarding@resend.dev>",
        to: [email],
        subject: "You're booked in! Your free backyard assessment 🌱",
        html: customerHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Free inspection form error:", err);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
