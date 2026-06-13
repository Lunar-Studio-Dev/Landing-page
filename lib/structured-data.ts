import { FAQS } from "./faqs";
import {
  CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;

/** Organization — site-wide entity. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: [...SOCIALS],
  };
}

/** WebSite — site-wide. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

const SERVICES: Array<{ name: string; description: string }> = [
  {
    name: "Custom Software Development",
    description:
      "Enterprise-grade custom software designed around your needs — scalable, secure, and built to integrate with your existing systems.",
  },
  {
    name: "AI Automation",
    description:
      "Intelligent automations that take over repetitive work, reduce errors, and free your team to focus on higher-value tasks.",
  },
  {
    name: "AI Consultation",
    description:
      "An expert assessment of your operations and a clear, practical AI roadmap tailored to your business.",
  },
  {
    name: "AI Workflows",
    description:
      "End-to-end AI workflows that connect your tools, teams, and processes into one efficient, intelligent system.",
  },
  {
    name: "CRM Development",
    description:
      "Custom CRM systems and integrations that fit how your team actually works and keep your data in sync.",
  },
];

/** ProfessionalService — the agency and its service catalog (homepage). */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    priceRange: "$$",
    areaServed: { "@type": "Place", name: "Worldwide" },
    parentOrganization: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software & AI Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": ORG_ID },
        },
      })),
    },
  };
}

/** FAQPage — no longer a rich result (retired May 2026) but aids AI Overviews. */
export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
