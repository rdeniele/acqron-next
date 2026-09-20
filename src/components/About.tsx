"use client";
import { useEffect, useRef } from "react";
import { useTyping } from "@/hooks/useTyping";
import TypedText from "@/components/TypedText";
import FactCard, { type Fact } from "@/components/FactCard";

const TEAM_HEADING = "Small, focused, and relentlessly outcome-driven.";

const values = [
  { n: "01", title: "We learn your industry first", desc: "We don't show up with a generic template. We learn how your firm earns, operates, and grows. Then we build around that, not around what's easiest to code." },
  { n: "02", title: "We build for real people", desc: "No over-engineered abstractions. Whether it's your agents, paralegals, or accountants using it daily, the software is designed around their actual workflows." },
  { n: "03", title: "We stay until you own it", desc: "Our engagement doesn't end at launch. We train, document, and support until your team runs everything confidently without us." },
  { n: "04", title: "We are honest about trade-offs", desc: "We'll tell you when something isn't worth building. Our reputation is built on outcomes for our clients, not on maximizing project scope." },
];

const team = [
  { initials: "RP", name: "Ron Paragoso", role: "Founder & CEO", bio: "Visionary leader translating complex problems into elegant software solutions and strategic direction." },
  { initials: "SD", name: "Stalingrad Dollosa", role: "Co-Founder & Software Engineer", bio: "Technical expert who works directly with clients to integrate, customize, and solve complex product problems in real time, embedded in the firm until it's running." },
  { initials: null, name: "You?", role: "Open Role", bio: "We're growing into law and accounting. If you understand how professional services firms operate and want to build for them, we'd love to talk." },
  { initials: null, name: "Growing", role: "Open Role", bio: "Acqron is expanding its team. If you want to build tools that real firms depend on every day, we'd love to hear from you." },
];

const facts: Fact[] = [
  {
    stat: "97%",
    label: "of Philippine MSMEs still manage operations manually with spreadsheets, group chats, and paper trails.",
    source: "PSA MSME Report 2023",
    large: true,
    detail: {
      title: "What manual operations look like",
      intro: "In practice, day-to-day work runs across spreadsheets, chat threads, and paper files instead of one shared system.",
      points: [
        "Duplicated work: the same details re-entered in several places.",
        "Scattered information: the latest version sits in a chat or a sheet.",
        "Manual follow-ups: reminders depend on someone remembering.",
        "No central view: checking status means asking around.",
      ],
      acqron: "Acqron replaces the patchwork with one purpose-built system that matches how your team already works.",
    },
  },
  {
    stat: "< 12%",
    label: "of local law firms have practice management software of any kind.",
    source: "IBP Survey 2022",
    detail: {
      title: "What practice management software does",
      intro: "It gives a firm one place to run every matter. Without it, deadlines, files, and billing drift across separate tools and inboxes.",
      points: [
        "Case and matter tracking",
        "Documents and client communication",
        "Deadlines and docketing",
        "Billing, time entry, and internal workflows",
      ],
      acqron: "Acqron builds this around your firm's own workflows, so cases, documents, deadlines, and billing live in one system.",
    },
  },
  {
    stat: "₱2.3T",
    label: "in real estate transactions processed in the Philippines yearly, almost none with purpose-built tools.",
    source: "BSP / DHSUD 2023",
    detail: {
      title: "The scale behind ₱2.3T",
      intro: "That is the yearly value of real estate transactions cited here. Each deal involves several parties and many documents, often coordinated across spreadsheets and messaging apps.",
      points: [
        "Property tracking across listings and status",
        "Lead management and follow-up",
        "Document workflows and approvals",
        "Transaction coordination and reporting",
      ],
      acqron: "That gap is an opportunity for purpose-built internal systems that keep listings, leads, documents, and reporting connected.",
    },
  },
  {
    stat: "1 in 3",
    label: "accounting firms in the Visayas still reconciles books entirely in Excel.",
    source: "BOA Industry Study 2023",
    detail: {
      title: "Why Excel-only accounting strains at scale",
      intro: "Spreadsheets are flexible, but keeping them accurate by hand gets harder as the number of clients grows.",
      points: [
        "Reconciliation: matching entries line by line, every period.",
        "Version control: knowing which file is current.",
        "Data entry: the same figures typed in more than once.",
        "Reporting and collaboration: hard to share one file.",
      ],
      acqron: "Software removes the repetitive steps and gives the whole team one live view of each client's books.",
    },
  },
  {
    stat: "8 wks",
    label: "is how long it takes us to ship a working system: not a prototype, but a real tool your team uses every day.",
    source: "Acqron average across all engagements",
    detail: {
      title: "What we mean by a working system",
      intro: "A production-oriented tool your team uses in their daily work, not a visual prototype or a demo.",
      steps: ["Understand the workflow", "Design the solution", "Build", "Test", "Deploy"],
      acqron: "We keep engagements small, focused, and outcome-driven, so the first release solves a real problem.",
    },
  },
];


export default function About() {
  const { ref: headRef, displayed, done } = useTyping(TEAM_HEADING, 36);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".about-reveal");
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
    <section ref={sectionRef} id="about" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
      <div className="container">

        {/* Top: copy + values */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "start", marginBottom: "var(--section-py)" }} className="about-top">
          <div>
            <h2 className="about-reveal reveal delay-1" style={{ fontSize: "clamp(2rem,3.2vw,3rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: 24, color: "var(--ink)" }}>
              Built in the Philippines.<br />Proven with US clients.
            </h2>
            <p className="about-reveal reveal delay-2" style={{ fontSize: 15, lineHeight: 1.7, letterSpacing: "-0.01em", color: "var(--muted)", marginBottom: 14 }}>
              Acqron is a web design and development company in Bacolod City, Philippines. We cut our teeth building websites and software for real estate brokerages and rental management firms across the United States, companies that depend on their technology to close deals, manage properties, and serve clients every day. That experience gave us a standard most local teams haven&rsquo;t seen yet.
            </p>
            <p className="about-reveal reveal delay-3" style={{ fontSize: 15, lineHeight: 1.7, letterSpacing: "-0.01em", color: "var(--muted)", marginBottom: 24 }}>
              Now we&rsquo;re bringing that same bar to Philippine businesses. Real estate firms, law practices, and accounting offices here are running on spreadsheets and group chats, the same way US firms were before purpose-built tools changed everything. We&rsquo;re here to close that gap.
            </p>
            <div className="about-reveal reveal delay-4" style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 13, fontWeight: 500, color: "var(--muted)", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Bacolod City, Philippines
              </span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Serving US &amp; PH clients
              </span>
            </div>
          </div>

          <div className="about-reveal reveal delay-2" style={{ borderTop: "0.9px solid var(--border)" }}>
            {values.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px 0", borderBottom: "0.9px solid var(--border)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-2)", letterSpacing: ".04em", flexShrink: 0, paddingTop: 3 }}>{v.n}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 5 }}>{v.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, letterSpacing: "-0.01em", color: "var(--muted)" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philippine market facts grid. Raised so hover popovers paint above the Team block below. */}
        <div className="about-reveal reveal" style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted-2)", marginBottom: 16 }}>
            The gap we're here to close
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 3fr 3fr",
              gridTemplateRows: "auto auto",
              gap: "clamp(4px, 0.4vw, 8px)",
              position: "relative", // containing block for the fact popovers
            }}
            className="carousel-grid"
          >
            {facts.map((f, i) => (
              <FactCard key={f.stat} fact={f} gridStyle={i === 0 ? { gridColumn: "1", gridRow: "1 / 3" } : undefined} />
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="about-reveal reveal" style={{ marginTop: "var(--section-py)" }}>
          {/* Typing heading — hook controls visibility */}
          <h3
            ref={headRef as React.RefObject<HTMLHeadingElement>}
            className={!done ? "typing-cursor" : ""}
            style={{ fontSize: "clamp(1.5rem,2.4vw,2.25rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 52, maxWidth: 520, color: "var(--ink)" }}
          >
            <TypedText full={TEAM_HEADING} shown={displayed} />
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }} className="team-grid">
            {team.map((t, i) => (
              <div
                key={i}
                style={{ border: `0.9px solid var(--border)`, borderStyle: t.initials ? "solid" : "dashed", borderRadius: 2, padding: "20px 16px", position: "relative", overflow: "hidden", opacity: t.initials ? 1 : 0.6, transition: "border-color 150ms" }}
              >
                <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 16, height: 16, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)" }} />
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.initials ? "var(--ink-2)" : "transparent", border: t.initials ? undefined : "1.5px dashed var(--border)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginBottom: 14, flexShrink: 0 }}>
                  {t.initials
                    ? t.initials
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  }
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", color: t.initials ? "var(--ink)" : "var(--muted)", marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--orange)", letterSpacing: ".02em", marginBottom: 10 }}>{t.role}</div>
                <p style={{ fontSize: 12, lineHeight: 1.55, letterSpacing: "-0.01em", color: "var(--muted)" }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <style>{`
        @media(max-width:900px){
          .about-top { grid-template-columns:1fr !important; gap:44px !important; margin-bottom:80px !important; }
          .team-grid  { grid-template-columns:repeat(2,1fr) !important; }
          /* On tablet: collapse to 2-col, large cell stays portrait but only spans row 1 */
          .carousel-grid { grid-template-columns:1fr 1fr !important; grid-template-rows:auto !important; }
          .carousel-grid > .fact-slot:first-child > .fact-card { grid-column:1 !important; grid-row:auto !important; }
          .carousel-grid > .fact-slot:first-child > .fact-card > div { aspect-ratio:16/10 !important; height:auto !important; }
        }
        @media(max-width:600px){
          .team-grid  { grid-template-columns:1fr !important; }
          .carousel-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
