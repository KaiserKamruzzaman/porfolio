import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Attempting to send email from:", name, email);

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
      to: ["kaiserkamruzzaman@gmail.com"], // Your email
      replyTo: email, // Visitor's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", data);

    // Check if there was an error in the response
    if (data.error) {
      console.error("Resend API error:", data.error);
      return NextResponse.json(
        { error: "Failed to send email", details: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    console.error("Error details:", error?.message, error?.statusCode);
    return NextResponse.json(
      { error: "Failed to send email", details: error?.message },
      { status: 500 }
    );
  }
}
