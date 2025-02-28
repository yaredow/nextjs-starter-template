interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  // Implementation depends on your email provider
  // Example using a hypothetical email service:

  // For development, you might want to log the email content
  if (process.env.NODE_ENV === "development") {
    console.log("---- EMAIL SENT ----");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text}`);
    console.log("--------------------");
    return;
  }

  // In production, use your preferred email service
  // For example, with nodemailer, SendGrid, AWS SES, etc.

  // Example with a fetch call to an email API:
  try {
    const response = await fetch(`${process.env.EMAIL_API_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        to,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
