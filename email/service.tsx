import { render } from "@react-email/render";

import { requiredEnv } from "./env";
import { getEmailAdapter } from "./factory";
import { CustomerQuery } from "./templates/customer-query";
import { LeadsInquiry } from "./templates/leads-inquiry";
import type { ContactPayload } from "./types";

/**
 * Renders the two contact templates and sends them through the configured
 * adapter: a greeting to the user, then the lead details to us (with the
 * reply-to set to the user so we can respond directly).
 */
export async function sendContactEmails(data: ContactPayload): Promise<void> {
  const adapter = getEmailAdapter();
  const from = requiredEnv("EMAIL_FROM");
  const leadsInbox = requiredEnv("LEADS_INBOX");
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const [customerHtml, leadsHtml] = await Promise.all([
    render(<CustomerQuery firstName={data.firstName} reason={data.reason} />),
    render(<LeadsInquiry {...data} submittedAt={submittedAt} />),
  ]);

  // 1. greeting to the user
  await adapter.send({
    from,
    to: data.email,
    subject: "Thanks for reaching out to Lunar Studio",
    html: customerHtml,
  });

  // 2. lead details to us — reply-to the user
  await adapter.send({
    from,
    to: leadsInbox,
    replyTo: data.email,
    subject: `New lead — ${data.firstName} ${data.lastName} · ${data.reason}`,
    html: leadsHtml,
  });
}
