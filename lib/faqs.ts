/** Shared FAQ content - consumed by the FAQ section and the FAQPage JSON-LD. */
export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Will your solutions work with the systems we already use?",
    answer:
      "Yes. We design everything to integrate with your existing tools, platforms, and data sources - whether that's your CRM, ERP, internal databases, or third-party APIs. You won't need to rip and replace what's already working.",
  },
  {
    question: "We're new to AI - where should we even start?",
    answer:
      "That's exactly what our AI Consultation is for. We begin with a deep dive into your current operations, identify where AI can create the most impact, and build a practical roadmap - no jargon, no guesswork, just a clear plan tailored to your business.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We've worked across a range of industries, including finance, healthcare, retail, and logistics. While the tools and use cases vary, our approach stays the same - understand your specific challenges first, then build solutions that fit.",
  },
  {
    question: "Do we need an in-house AI or tech team to work with you?",
    answer:
      "Not at all. We handle the technical heavy lifting from start to finish. Whether you have an internal tech team we collaborate with, or none at all, we adapt our process to fit smoothly into how your organisation operates.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "We don't just hand it off and disappear. We offer ongoing support, monitoring, and optimisation to make sure your systems continue performing well and evolving alongside your business needs.",
  },
];
