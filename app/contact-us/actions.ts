"use server";

import { sendContactEmails } from "@/email";
import { getPostHogClient } from "@/lib/posthog-server";

import { contactSchema } from "./schema";

export type ContactState = { ok: boolean; error?: string };

export async function submitContact(values: unknown): Promise<ContactState> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const posthog = getPostHogClient();

  try {
    await sendContactEmails(parsed.data);
    posthog.capture({
      distinctId: parsed.data.email,
      event: "server_contact_submitted",
      properties: {
        reason: parsed.data.reason,
        business_name: parsed.data.businessName,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("Contact submission failed:", error);
    posthog.capture({
      distinctId: parsed.data.email,
      event: "server_contact_failed",
      properties: {
        reason: parsed.data.reason,
        error: error instanceof Error ? error.message : String(error),
      },
    });
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again.",
    };
  }
}
