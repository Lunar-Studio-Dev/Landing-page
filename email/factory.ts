import type { EmailAdapter } from "./adapter";
import { requiredEnv } from "./env";
import { ResendProvider } from "./providers/resend.provider";
import { SmtpProvider } from "./providers/smtp.provider";

let cached: EmailAdapter | null = null;

function build(): EmailAdapter {
  const provider = (process.env.EMAIL_PROVIDER ?? "resend").toLowerCase();

  if (provider === "smtp") {
    return new SmtpProvider({
      host: requiredEnv("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    });
  }

  return new ResendProvider(requiredEnv("RESEND_API_KEY"));
}

/** Returns the configured email adapter (cached after first build). */
export function getEmailAdapter(): EmailAdapter {
  if (!cached) cached = build();
  return cached;
}
