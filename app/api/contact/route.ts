// app/api/contact/route.ts — POST handler for contact form, sends via Resend
import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    const { name, businessName, email, phone, message } = body;

    if (!name?.trim() || !businessName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, business name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL");
      return NextResponse.json(
        { error: "Server configuration error. Please email us directly." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.CONTACT_FROM ??
      "Applicreations Site <onboarding@resend.dev>";

    // 1. Send inquiry to business
    const { error } = await resend.emails.send({
      from,
      to: contactEmail,
      replyTo: email,
      subject: `New inquiry from ${businessName}`,
      text: `Name: ${name}
Business: ${businessName}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try emailing us directly." },
        { status: 500 }
      );
    }

    // 2. Send confirmation to customer (with logo — hosted URL, no attachment)
    const logoUrl =
      process.env.EMAIL_LOGO_URL ||
      "https://applicreations.com/logo-CRiT17MI.png";

    const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:16px;line-height:1.6;color:#333;background-color:#f5f5f5;">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">
    <div style="text-align:center;margin-bottom:28px;">
      <img src="${logoUrl}" alt="Applicreations" width="120" height="auto" style="display:inline-block;max-width:120px;height:auto;" />
    </div>
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Thank you for reaching out to Applicreations. We've received your inquiry and will get back to you within 1–2 business days.</p>
    <p style="margin:0 0 12px;font-weight:600;font-size:14px;">Here's a copy of what you sent:</p>
    <div style="margin:0 0 20px;padding:16px;background:#f8f9fa;border-radius:8px;font-size:14px;">
      <p style="margin:0 0 8px;"><strong>Business:</strong> ${escapeHtml(businessName)}</p>
      ${phone ? `<p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
    <p style="margin:0 0 20px;">If you have any urgent questions in the meantime, feel free to reply to this email or contact us directly.</p>
    <p style="margin:0;color:#666;font-size:14px;">Best regards,<br />The Applicreations Team</p>
  </div>
</body>
</html>`;

    const confirmText = `Hi ${name},

Thank you for reaching out to Applicreations. We've received your inquiry and will get back to you within 1–2 business days.

Here's a copy of what you sent:

Business: ${businessName}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}

If you have any urgent questions in the meantime, feel free to reply to this email or contact us directly.

Best regards,
The Applicreations Team`;

    const { error: confirmError } = await resend.emails.send({
      from,
      to: email,
      subject: "We received your inquiry — Applicreations",
      html: confirmHtml,
      text: confirmText,
    });

    if (confirmError) {
      console.error("Failed to send confirmation email:", confirmError);
      // Inquiry was received; don't fail the request
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try emailing us directly." },
      { status: 500 }
    );
  }
}
