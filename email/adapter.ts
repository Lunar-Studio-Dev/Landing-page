/**
 * The single email adaptor contract. Concrete providers (Resend, SMTP) each
 * implement this interface so the rest of the app sends mail without knowing
 * which provider is active.
 */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
};

export type SendResult = { id?: string };

export interface EmailAdapter {
  readonly name: "resend" | "smtp";
  send(message: EmailMessage): Promise<SendResult>;
}
