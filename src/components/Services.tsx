"use client";
import { useEffect, useRef, useState } from "react";
import { useTyping } from "@/hooks/useTyping";
import { useWordFade } from "@/hooks/useWordFade";
import TypedText from "@/components/TypedText";

const HEADING = "Web design, development, and software for firms that run on trust.";
const SUBTITLE = "Real estate, law, and accounting: Acqron knows how these businesses operate, and builds websites and software accordingly.";

const services = [
  {
    n: "01", name: "Web Design & Development",
    desc: "Acqron designs and develops custom websites, landing pages, and web applications for real estate brokerages, law firms, and accounting practices. Every build is made to earn trust, generate leads, and reflect the professionalism your clients expect.",
    bullets: ["Custom brokerage & firm websites", "Property listing & lead capture pages", "Service pages built for conversions", "SEO-ready, fast, mobile-first builds in React and Next.js"],
  },
  {
    n: "02", name: "Property & Rental Management Tools",
    desc: "Custom platforms built for real estate brokerages, property managers, and rental firms. They replace spreadsheets and generic CRMs with systems that match how you actually close deals and manage units.",
    bullets: ["Listing & lead management portals", "Tenant & lease tracking systems", "Automated rental collection & reminders", "Agent dashboards & commission tracking"],
  },
  {
    n: "03", name: "Law Firm Practice Software",
    desc: "Internal tools and client portals for litigation, corporate, and transactional practices, built around your firm's workflows, not a vendor's idea of what a law firm should look like.",
    bullets: ["Matter & case management systems", "Client intake & document portals", "Deadline & docket tracking tools", "Billing workflow & time-entry automation"],
  },
  {
    n: "04", name: "Accounting & Finance Operations",
    desc: "We build the internal tools that let accounting firms serve more clients without growing headcount, automating the repetitive work so your team focuses on advisory, not data entry.",
    bullets: ["Client onboarding & data collection", "Automated reporting & reconciliation", "Engagement tracking dashboards", "Payroll & compliance workflow tools"],
  },
  {
    n: "05", name: "Workflow & Process Automation",
    desc: "We audit how your firm actually operates, find the manual friction, and replace it with automated systems your team will actually use, whether that's document generation, email follow-ups, or approval flows.",
    bullets: ["Operations & workflow audit", "Document generation & e-signature flows", "Automated follow-up & notification systems", "Cross-tool integrations & API connections"],
  },
  {
    n: "06", name: "Dashboards, Reporting & Analytics",
    desc: "Turn raw firm data into clear, real-time decisions. We build reporting tools so principals and partners can see pipeline, capacity, and performance without waiting on a staff member to pull a spreadsheet.",
    bullets: ["Partner & principal dashboards", "Pipeline & revenue reporting", "Client retention & activity tracking", "Custom exports & scheduled reports"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref: headRef, displayed, done } = useTyping(HEADING, 36);
  const subRef = useWordFade(SUBTITLE, 40);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".svc-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
      <div className="container">

        {/* Typing heading — hook controls visibility */}
        <div style={{ marginBottom: 56 }}>
          <h2
            ref={headRef as React.RefObject<HTMLHeadingElement>}
            className={!done ? "typing-cursor" : ""}
            style={{
              fontSize: "clamp(2rem,3.5vw,3.25rem)",
              fontWeight: 700, lineHeight: 1.0,
              letterSpacing: "-0.04em", maxWidth: 580,
              marginTop: 14, marginBottom: 14, color: "var(--ink)",
            }}
          >
            <TypedText full={HEADING} shown={displayed} />
          </h2>
          <p
            ref={subRef as React.RefObject<HTMLParagraphElement>}
            className="word-fade-up"
            style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", letterSpacing: "-0.02em", maxWidth: 440 }}
          >
            {/* Full text for crawlers; useWordFade replaces it with animated word spans on mount */}
            <span className="sr-only">{SUBTITLE}</span>
          </p>
        </div>

        {/* Accordion rows — each row has its own reveal */}
        <ul style={{ borderTop: "0.9px solid var(--border)", listStyle: "none" }}>
          {services.map((s, i) => (
            <li key={i} className={`svc-reveal reveal delay-${Math.min(i + 1, 5)}`} style={{ borderBottom: "0.9px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 16, padding: "24px 0", width: "100%", textAlign: "left",
                  cursor: "pointer", background: "none", border: "none", fontFamily: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-2)", width: 22, flexShrink: 0, letterSpacing: "-0.01em" }}>{s.n}</span>
                  <span style={{ fontSize: "clamp(1.125rem,1.8vw,1.75rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)" }}>{s.name}</span>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: open === i ? "var(--ink-2)" : "transparent", transition: "background 180ms, border-color 180ms" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open === i ? "#fbfbf9" : "var(--ink)"} strokeWidth="2" style={{ transition: "transform 280ms var(--ease)", transform: open === i ? "rotate(45deg)" : "none" }}>
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              <div className={`svc-panel ${open === i ? "open" : ""}`}>
                <div className="svc-panel-inner">
                  <div style={{ paddingBottom: 28, paddingLeft: 42, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="svc-body">
                    <p style={{ fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.01em", color: "var(--muted)" }}>{s.desc}</p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none" }}>
                      {s.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 500, color: "var(--muted)", letterSpacing: "-0.01em" }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)", flexShrink: 0, display: "inline-block" }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style>{`@media(max-width:640px){ .svc-body { grid-template-columns:1fr !important; padding-left:0 !important; } }`}</style>
    </section>
  );
}
