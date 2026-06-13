import { Resend } from "resend";

import type { EmailAdapter, EmailMessage, SendResult } from "../adapter";

/** Resend-backed email provider. */
export class ResendProvider implements EmailAdapter {
  readonly name = "resend" as const;
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<SendResult> {
    if (!message.from) {
      throw new Error("ResendProvider: a `from` address is required");
    }

    const { data, error } = await this.client.emails.send({
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
    });

    if (error) {
      throw new Error(`Resend send failed: ${error.message}`);
    }

    return { id: data?.id };
  }
}
