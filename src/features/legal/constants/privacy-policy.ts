// src/features/public/constants/privacy-policy.ts

import type { LegalSectionData } from "./LegalSection";
import { PUBLIC_CONFIG } from "./public.constants";

export const PRIVACY_POLICY_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      {
        id: "introduction-1",
        text:
          `${PUBLIC_CONFIG.companyName} respects your privacy and is committed ` +
          "to handling personal information responsibly. This Privacy Policy " +
          "explains what information we collect, why we collect it, how we use " +
          "it, and the choices available to you when using our mobile application, " +
          "website, transportation services, and related features.",
      },
    ],
  },

  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      {
        id: "information-1",
        text:
          "The information we collect depends on the services you use and your " +
          "relationship with the platform.",
      },
    ],
    bullets: [
      "Account information, including your name, phone number, email address, profile photo, and account credentials.",
      "Trip information, including requested pickup points, destinations, routes, bookings, cancellations, and travel history.",
      "Location information when you permit the application to access your device location.",
      "Payment and transaction information processed through authorized payment providers.",
      "Device and technical information, including device type, operating system, application version, language, IP address, and diagnostic information.",
      "Communications sent to customer support, drivers, operators, or other authorized participants.",
      "Driver and operator verification information, including licenses, vehicle information, identification documents, and compliance records where applicable.",
    ],
  },

  {
    id: "location-data",
    title: "Location Information",
    paragraphs: [
      {
        id: "location-1",
        text:
          "Location information enables important transportation features such as " +
          "identifying nearby services, selecting pickup points, calculating routes, " +
          "estimating arrival times, tracking active journeys, and supporting safety operations.",
      },
      {
        id: "location-2",
        text:
          "Depending on the service and permissions you grant, location access may " +
          "occur while the application is open or during an active trip. You may " +
          "change location permissions through your device settings, although some " +
          "features may stop functioning correctly.",
      },
    ],
  },

  {
    id: "use-of-information",
    title: "How We Use Information",
    bullets: [
      "Create, secure, and manage user accounts.",
      "Connect passengers with transportation providers and operators.",
      "Process trip requests, bookings, payments, refunds, and service communications.",
      "Provide navigation, routing, tracking, arrival estimates, and service updates.",
      "Verify drivers, vehicles, operators, and other service participants.",
      "Detect fraud, abuse, security threats, unsafe conduct, and violations of platform rules.",
      "Provide customer support and resolve disputes.",
      "Improve platform reliability, accessibility, performance, and user experience.",
      "Comply with legal obligations and enforce our agreements.",
    ],
  },

  {
    id: "sharing",
    title: "How Information May Be Shared",
    paragraphs: [
      {
        id: "sharing-1",
        text:
          "We do not sell personal information. We may share limited information " +
          "when necessary to provide, secure, and improve Smart Link Transit services.",
      },
    ],
    bullets: [
      "With passengers, drivers, operators, or transportation partners when necessary to complete a trip or service request.",
      "With payment processors, mapping providers, cloud providers, communication providers, analytics services, and other contracted service providers.",
      "With government authorities, regulators, courts, or law-enforcement agencies when legally required or necessary to protect rights and safety.",
      "In connection with a merger, acquisition, financing, reorganization, or transfer of all or part of the business, subject to appropriate safeguards.",
    ],
  },

  {
    id: "retention",
    title: "Data Retention",
    paragraphs: [
      {
        id: "retention-1",
        text:
          "We retain information only for as long as reasonably necessary to provide " +
          "services, maintain security, resolve disputes, satisfy legal and accounting " +
          "requirements, and enforce our agreements. Retention periods may differ based " +
          "on the type of information and the reason it was collected.",
      },
    ],
  },

  {
    id: "security",
    title: "Data Security",
    paragraphs: [
      {
        id: "security-1",
        text:
          "We use administrative, technical, and organizational safeguards designed " +
          "to protect personal information. However, no electronic transmission or " +
          "storage system can be guaranteed to be completely secure.",
      },
    ],
  },

  {
    id: "rights",
    title: "Your Choices and Rights",
    bullets: [
      "Review and update eligible profile information through your account.",
      "Control device permissions such as location, camera, notifications, and contacts.",
      "Request access to, correction of, or deletion of eligible personal information.",
      "Opt out of non-essential promotional communications.",
      "Contact us with privacy questions, complaints, or requests.",
    ],
  },

  {
    id: "children",
    title: "Children’s Privacy",
    paragraphs: [
      {
        id: "children-1",
        text:
          "Smart Link Transit is not intended for children who are not legally permitted " +
          "to use transportation or payment services independently. Where minors may use " +
          "the service, they must do so under applicable law and any required supervision.",
      },
    ],
  },

  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      {
        id: "changes-1",
        text:
          "We may update this Privacy Policy as our services, technology, or legal " +
          "obligations change. We will update the effective date and provide additional " +
          "notice when a material change requires it.",
      },
    ],
  },

  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      {
        id: "contact-1",
        text: `Privacy questions and requests may be sent to ${PUBLIC_CONFIG.privacyEmail}.`,
      },
    ],
  },
];
