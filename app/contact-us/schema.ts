import { z } from "zod";

import { REASONS } from "@/email/types";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  reason: z.enum(REASONS, { message: "Please pick a reason" }),
});

export type ContactValues = z.infer<typeof contactSchema>;
