"use server";

import { sendContactEmails } from "@/email";

import { contactSchema } from "./schema";

export type ContactState = { ok: boolean; error?: string };

export async function submitContact(values: unknown): Promise<ContactState> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  try {
    await sendContactEmails(parsed.data);
    return { ok: true };
  } catch (error) {
    console.error("Contact submission failed:", error);
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again.",
    };
  }
}
