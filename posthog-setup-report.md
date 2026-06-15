<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lunar Studio landing page. PostHog is initialized client-side via `instrumentation-client.ts` (Next.js 15.3+ pattern) using a reverse proxy through `/ingest` to improve ad-blocker bypass rates. A server-side client in `lib/posthog-server.ts` tracks contact form submissions directly from the Server Action, ensuring no conversion is missed even if the client event fails. Events are captured at every key touch-point in the conversion funnel: hero CTA, closing CTA section, header navigation, the contact form itself, and FAQ interactions.

| Event | Description | File |
|---|---|---|
| `cta_clicked` | User clicked "Book a free call" in the hero section | `components/sections/hero.tsx` |
| `cta_clicked` | User clicked "Book a free call" in the closing CTA section | `components/sections/cta.tsx` |
| `nav_contact_clicked` | User clicked "Contact us" in the header (desktop or mobile) | `components/sections/header.tsx` |
| `contact_form_submitted` | Contact form submitted successfully (client-side) | `app/contact-us/contact-form.tsx` |
| `contact_form_failed` | Contact form submission returned a server error (client-side) | `app/contact-us/contact-form.tsx` |
| `faq_expanded` | User expanded a FAQ accordion item | `components/sections/faq.tsx` |
| `server_contact_submitted` | Email sent successfully (server-side, distinct ID = email) | `app/contact-us/actions.ts` |
| `server_contact_failed` | Email sending failed (server-side) | `app/contact-us/actions.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/471038/dashboard/1713593)
- [Contact Form Submissions](https://us.posthog.com/project/471038/insights/RhKx5ipX) — daily trend of successful form submits
- [CTA Click → Contact Form Conversion Funnel](https://us.posthog.com/project/471038/insights/dkoDD5mZ) — drop-off from CTA click to form submit
- [CTA Clicks by Location](https://us.posthog.com/project/471038/insights/Ga56btbF) — which section (hero, cta_section, header) drives the most clicks
- [FAQ Engagement](https://us.posthog.com/project/471038/insights/I3eiKyhA) — daily FAQ accordion opens as a consideration signal
- [Contact Form Success vs Failure](https://us.posthog.com/project/471038/insights/VByNWW1p) — monitor form health over time

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
