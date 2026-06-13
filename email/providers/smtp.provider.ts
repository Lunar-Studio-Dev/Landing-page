import nodemailer, { type Transporter } from "nodemailer";

import type { EmailAdapter, EmailMessage, SendResult } from "../adapter";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

/** SMTP-backed email provider (nodemailer). */
export class SmtpProvider implements EmailAdapter {
  readonly name = "smtp" as const;
  private readonly transporter: Transporter;

  constructor(config: SmtpConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
  }

  async send(message: EmailMessage): Promise<SendResult> {
    const info = await this.transporter.sendMail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
    });

    return { id: info.messageId };
  }
}
