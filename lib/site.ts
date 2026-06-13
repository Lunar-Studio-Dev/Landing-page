/** Central site config used across metadata, structured data, sitemap, robots. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunarstudio.dev"
).replace(/\/$/, "");

export const SITE_NAME = "Lunar Studio";

export const SITE_TAGLINE =
  "Custom Software Development & AI Automation Agency";

export const SITE_DESCRIPTION =
  "Lunar Studio is a software development and AI automation agency. We build custom software, CRM systems, and end-to-end AI workflows that automate repetitive work and help your business grow.";

export const CONTACT = {
  email: "team@lunarstudio.dev",
  phone: "+917250903533",
  phoneDisplay: "+91 72509 03533",
} as const;

export const SOCIALS = [
  "https://instagram.com/lunarstudio.hq",
  "https://x.com/lunarstudio",
  "https://linkedin.com/company/lunarstudio",
] as const;

export const SEO_KEYWORDS = [
  "custom software development",
  "AI automation",
  "AI workflows",
  "CRM development",
  "software development company",
  "software development agency",
  "AI consultation",
  "business automation",
];
