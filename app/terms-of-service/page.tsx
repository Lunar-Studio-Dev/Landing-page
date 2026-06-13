import type { Metadata } from "next";

import {
  LegalPage,
  type LegalSection,
} from "@/components/sections/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service - Lunar Studio",
  description:
    "The terms that govern your use of Lunar Studio's website and services.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    heading: "Agreement to Terms",
    body: (
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of the Lunar Studio website and the services we provide. By using our
        website or engaging us for a project, you agree to these Terms. If you
        do not agree, please do not use the site or our services.
      </p>
    ),
  },
  {
    id: "services",
    heading: "Our Services",
    body: (
      <p>
        Lunar Studio designs and builds digital systems - including AI
        automations, AI consultation, custom software, and AI workflows. The
        specific scope, deliverables, and timeline for any engagement are
        defined in a separate proposal or statement of work agreed between you
        and us.
      </p>
    ),
  },
  {
    id: "eligibility",
    heading: "Eligibility",
    body: (
      <p>
        You must be at least 18 years old and able to enter into a binding
        contract to use our services. If you are acting on behalf of an
        organisation, you represent that you have authority to bind that
        organisation to these Terms.
      </p>
    ),
  },
  {
    id: "engagements",
    heading: "Engagements & Proposals",
    body: (
      <>
        <p>
          Work begins once both parties agree on a written proposal or statement
          of work. Each proposal sets out the scope, deliverables, fees, and
          timeline. Anything outside the agreed scope is handled as a separate
          change request.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    heading: "Client Responsibilities",
    body: (
      <>
        <p>To help us deliver successfully, you agree to:</p>
        <ul>
          <li>
            Provide timely access to the people, systems, and information we
            need.
          </li>
          <li>Review deliverables and give feedback within agreed windows.</li>
          <li>
            Ensure you have the rights to any materials, data, or accounts you
            share with us.
          </li>
        </ul>
        <p>
          Delays in providing access or feedback may affect timelines and costs.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    heading: "Fees & Payment",
    body: (
      <p>
        Fees, payment schedule, and currency are set out in the applicable
        proposal. Unless stated otherwise, invoices are due within the period
        noted on the invoice. Late payments may pause work until the balance is
        settled.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <>
        <p>
          On full payment, you own the final deliverables we create
          specifically for you, including source code and assets.
        </p>
        <p>
          We retain ownership of our pre-existing tools, libraries,
          frameworks, and general know-how. We grant you a perpetual,
          non-exclusive licence to use any such components that are embedded in
          your deliverables.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: (
      <p>
        Each party agrees to keep the other&apos;s confidential information
        private and to use it only for the purpose of the engagement. This
        obligation continues after the engagement ends.
      </p>
    ),
  },
  {
    id: "warranties",
    heading: "Warranties & Disclaimers",
    body: (
      <p>
        We provide our services with reasonable skill and care. Except as
        expressly stated, our website and services are provided &quot;as
        is&quot; without warranties of any kind, whether express or implied,
        including fitness for a particular purpose.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by law, Lunar Studio is not liable for
        indirect, incidental, or consequential damages. Our total liability for
        any claim arising from an engagement is limited to the fees you paid us
        for that engagement.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "Term & Termination",
    body: (
      <p>
        Either party may terminate an engagement as set out in the applicable
        proposal, typically with written notice. On termination, you agree to
        pay for work performed up to the termination date, and we will hand over
        completed deliverables for which payment has been made.
      </p>
    ),
  },
  {
    id: "third-party-services",
    heading: "Third-Party Services",
    body: (
      <p>
        Our work may rely on third-party platforms and services (for example,
        cloud hosting or AI providers). Your use of those services is subject to
        their own terms, and we are not responsible for their availability or
        performance.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of the jurisdiction in which Lunar
        Studio is established, without regard to conflict-of-law principles. The
        courts of that jurisdiction will have exclusive jurisdiction over any
        disputes.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. When we do, we will revise
        the &quot;Last updated&quot; date above. Continued use of our website or
        services after changes take effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:hello@lunarstudio.com">hello@lunarstudio.com</a>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="June 13, 2026"
      intro={
        <p>
          Welcome to <strong>Lunar Studio</strong>. These Terms set out the
          rules for using our website and the basis on which we provide our
          services. Please read them carefully - your engagement-specific
          proposal, where one exists, takes precedence over these Terms if there
          is a conflict.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
