/**
 * Client-safe contact types and constants (no server/node imports), so the
 * form and zod schema can import them without pulling the email providers.
 */
export const REASONS = [
  "AI Automations",
  "AI Consultation",
  "Custom Software",
  "AI Workflows",
  "General inquiry",
] as const;

export type Reason = (typeof REASONS)[number];

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  reason: Reason;
};
