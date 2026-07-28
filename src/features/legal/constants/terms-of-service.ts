// src/features/public/constants/terms-of-service.ts

import type { LegalSectionData } from "./LegalSection";
import { PUBLIC_CONFIG } from "./public.constants";

export const TERMS_OF_SERVICE_SECTIONS: LegalSectionData[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    paragraphs: [
      {
        id: "acceptance-1",
        text:
          `These Terms of Service govern your access to and use of ${PUBLIC_CONFIG.appName}. ` +
          "By creating an account or using the platform, you agree to these terms and " +
          "any policies incorporated into them.",
      },
      {
        id: "acceptance-2",
        text: "Do not use the platform if you do not agree to these terms.",
      },
    ],
  },

  {
    id: "platform-role",
    title: "Platform Services",
    paragraphs: [
      {
        id: "platform-role-1",
        text:
          "Smart Link Transit provides technology that may help users discover, request, " +
          "schedule, pay for, monitor, or manage transportation services. The exact services " +
          "available may depend on location, account type, transportation operator, and applicable law.",
      },
      {
        id: "platform-role-2",
        text:
          "Where transportation is provided by independent drivers, operators, or third-party " +
          "providers, their services may be subject to additional rules and agreements.",
      },
    ],
  },

  {
    id: "eligibility",
    title: "Eligibility and Accounts",
    bullets: [
      "You must be legally capable of entering into these terms.",
      "You must provide accurate and current account information.",
      "You are responsible for maintaining the confidentiality of your account and verification credentials.",
      "You must promptly report suspected unauthorized account access.",
      "You may not create fraudulent, misleading, duplicate, or unauthorized accounts.",
    ],
  },

  {
    id: "acceptable-use",
    title: "Acceptable Use",
    paragraphs: [
      {
        id: "acceptable-use-1",
        text: "You must use Smart Link Transit lawfully, safely, and respectfully.",
      },
    ],
    bullets: [
      "Do not use the platform for unlawful, fraudulent, abusive, or dangerous activity.",
      "Do not threaten, harass, discriminate against, or harm passengers, drivers, operators, employees, or other users.",
      "Do not interfere with platform security, availability, software, networks, or data.",
      "Do not submit false trip requests, fraudulent payments, or misleading reports.",
      "Do not attempt to access another person’s account or restricted platform systems.",
      "Do not copy, scrape, reverse engineer, or commercially exploit the platform except where legally permitted.",
    ],
  },

  {
    id: "transportation",
    title: "Trips and Transportation Services",
    paragraphs: [
      {
        id: "transportation-1",
        text:
          "Trip availability, pickup times, routes, travel duration, vehicle availability, " +
          "and arrival estimates may vary due to traffic, weather, road conditions, demand, " +
          "service interruptions, operator decisions, safety issues, and other circumstances.",
      },
      {
        id: "transportation-2",
        text:
          "Users are responsible for verifying trip details, meeting pickup requirements, " +
          "following safety instructions, and treating vehicles and service participants respectfully.",
      },
    ],
  },

  {
    id: "payments",
    title: "Pricing, Payments, and Refunds",
    paragraphs: [
      {
        id: "payments-1",
        text:
          "Applicable prices, fees, taxes, cancellation charges, and payment methods will " +
          "be presented through the platform or communicated by the relevant provider.",
      },
      {
        id: "payments-2",
        text:
          "You authorize Smart Link Transit and its payment providers to process eligible " +
          "charges associated with your use of the platform. Refund eligibility depends on " +
          "the circumstances, applicable provider rules, and relevant law.",
      },
    ],
  },

  {
    id: "driver-requirements",
    title: "Driver and Operator Requirements",
    paragraphs: [
      {
        id: "driver-requirements-1",
        text:
          "Drivers and transportation operators must maintain all licenses, permits, vehicle " +
          "documents, insurance, inspections, approvals, and qualifications required by law " +
          "and by Smart Link Transit policies.",
      },
      {
        id: "driver-requirements-2",
        text:
          "Smart Link Transit may review documents, restrict platform access, request updated " +
          "information, or suspend participation when verification or safety requirements are not met.",
      },
    ],
  },

  {
    id: "suspension",
    title: "Suspension and Termination",
    paragraphs: [
      {
        id: "suspension-1",
        text:
          "We may restrict, suspend, or terminate access when reasonably necessary to investigate " +
          "fraud, protect safety, comply with law, address non-payment, or enforce these terms.",
      },
      {
        id: "suspension-2",
        text:
          "You may stop using the service and request account closure, subject to outstanding " +
          "transactions, investigations, retention requirements, and applicable law.",
      },
    ],
  },

  {
    id: "disclaimers",
    title: "Service Availability and Disclaimers",
    paragraphs: [
      {
        id: "disclaimers-1",
        text:
          "The platform may occasionally be unavailable, delayed, inaccurate, or interrupted. " +
          "We do not guarantee that every service, route, provider, feature, or payment method " +
          "will always be available.",
      },
      {
        id: "disclaimers-2",
        text: "Nothing in these terms excludes warranties or responsibilities that cannot legally be excluded.",
      },
    ],
  },

  {
    id: "liability",
    title: "Limitation of Liability",
    paragraphs: [
      {
        id: "liability-1",
        text:
          "To the maximum extent permitted by applicable law, Smart Link Transit will not be " +
          "liable for indirect, incidental, special, exemplary, or consequential losses arising " +
          "from use of or inability to use the platform.",
      },
      {
        id: "liability-2",
        text:
          "Any limitation applies only to the extent permitted by law and does not limit rights " +
          "that cannot legally be waived.",
      },
    ],
  },

  {
    id: "changes",
    title: "Changes to These Terms",
    paragraphs: [
      {
        id: "changes-1",
        text:
          "We may update these terms to reflect changes to services, business operations, " +
          "technology, or legal requirements. Continued use after an updated version becomes " +
          "effective may constitute acceptance where permitted by law.",
      },
    ],
  },

  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      {
        id: "contact-1",
        text: `Questions about these terms may be sent to ${PUBLIC_CONFIG.legalEmail}.`,
      },
    ],
  },
];
