import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";
import { faqs } from "@/data/faq";

const SITE = "https://www.acqron.com";
const TITLE = "Web Design & Development Company Philippines | Acqron";
const DESCRIPTION =
  "Acqron is a web design and development company in Bacolod City, Philippines. Fast, SEO-ready websites, web apps, and client portals for US and PH firms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "web design and development Philippines",
    "web development company Philippines",
    "website design Bacolod",
    "Bacolod web developer",
    "custom web application development",
    "SEO-ready website development",
    "client portal development",
    "real estate website development",
    "law firm website design",
    "accounting firm website design",
    "custom software development Philippines",
    "Acqron",
  ],
  authors: [{ name: "Acqron", url: SITE }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description:
      "Acqron designs and builds fast, SEO-ready websites, web apps, and client portals for real estate, law, and accounting firms. Working MVPs in 8 weeks. Based in Bacolod City, Philippines.",
    url: SITE,
    siteName: "Acqron",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Web design and development company in Bacolod City, Philippines. Websites, web apps, and client portals for professional services firms.",
  },
  metadataBase: new URL(SITE),
};

const ORG_ID = `${SITE}/#organization`;

const services = [
  {
    id: `${SITE}/#service-web-design-development`,
    name: "Web Design & Development",
    serviceType: "Web design and development",
    description:
      "Custom website design and development, landing pages, and web applications for real estate brokerages, law firms, and accounting practices, built to be fast, mobile-first, and SEO-ready.",
  },
  {
    id: `${SITE}/#service-property-rental-tools`,
    name: "Property & Rental Management Tools",
    serviceType: "Real estate software development",
    description:
      "Custom software for real estate brokerages and rental management firms, including listing systems, tenant portals, lead tracking, and booking platforms.",
  },
  {
    id: `${SITE}/#service-law-firm-software`,
    name: "Law Firm Practice Software",
    serviceType: "Law firm software development",
    description:
      "Practice management systems, case tracking, client intake portals, document management, and billing tools built for law firms.",
  },
  {
    id: `${SITE}/#service-accounting-software`,
    name: "Accounting & Finance Operations Software",
    serviceType: "Accounting software development",
    description:
      "Financial operations tools, reconciliation systems, client dashboards, and reporting software for accounting practices.",
  },
  {
    id: `${SITE}/#service-workflow-automation`,
    name: "Workflow & Process Automation",
    serviceType: "Workflow automation",
    description:
      "Custom automation systems that eliminate manual work and connect a firm's tools, data, and team.",
  },
  {
    id: `${SITE}/#service-dashboards-analytics`,
    name: "Dashboards, Reporting & Analytics",
    serviceType: "Business dashboards and reporting",
    description:
      "Real-time dashboards and reporting tools that give professional services firms visibility into their operations and performance.",
  },
];

const founders = [
  { id: `${SITE}/#ron-paragoso`, name: "Ron Paragoso", jobTitle: "Founder & CEO" },
  { id: `${SITE}/#stalingrad-dollosa`, name: "Stalingrad Dollosa", jobTitle: "Co-Founder & Software Engineer" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: "Acqron",
      url: SITE,
      logo: `${SITE}/acron-logo.png`,
      image: `${SITE}/acron-logo.png`,
      email: "info@acqron.com",
      description:
        "Acqron is a web design and development company based in Bacolod City, Philippines. Acqron designs and builds custom websites, web applications, client portals, dashboards, and workflow automation for real estate brokerages, law firms, and accounting practices in the United States and the Philippines.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bacolod City",
        addressRegion: "Negros Occidental",
        addressCountry: "PH",
      },
      foundingLocation: { "@type": "Place", name: "Bacolod City, Negros Occidental, Philippines" },
      areaServed: [
        { "@type": "Country", name: "Philippines" },
        { "@type": "Country", name: "United States" },
      ],
      knowsAbout: [
        "Web design",
        "Web development",
        "Website design for professional services firms",
        "Search engine optimization",
        "Client portal development",
        "Real estate software",
        "Law firm practice management",
        "Accounting software",
        "Workflow automation",
        "Custom internal tools",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@acqron.com",
        availableLanguage: "English",
      },
      founder: founders.map((f) => ({ "@id": f.id })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Acqron web design, development, and software services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": s.id },
        })),
      },
    },
    ...founders.map((f) => ({
      "@type": "Person",
      "@id": f.id,
      name: f.name,
      jobTitle: f.jobTitle,
      worksFor: { "@id": ORG_ID },
    })),
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Acqron",
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": ORG_ID },
    },
    ...services.map((s) => ({
      "@type": "Service",
      "@id": s.id,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      provider: { "@id": ORG_ID },
      areaServed: ["Philippines", "United States"],
    })),
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
