import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

const resend = new Resend(process.env.RESEND_API);

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "workwithparsai@gmail.com",
      subject: subject
        ? `Portfolio Inquiry: ${subject}`
        : "New Portfolio Contact",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          </div>
          <div style="margin-top: 30px;">
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee; white-space: pre-wrap;">${message}</div>
          </div>
          <footer style="margin-top: 40px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            This email was sent from your portfolio contact form.
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Submission Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
