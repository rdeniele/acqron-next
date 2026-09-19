"use client";
import { useEffect, useRef } from "react";
import { useTyping } from "@/hooks/useTyping";
import TypedText from "@/components/TypedText";

const HEADING = "Let's build the website or system your firm actually needs.";

export default function Contact() {
  const { ref: headRef, displayed, done } = useTyping(HEADING, 36);
  const sectionRef = useRef<HTMLElement>(null);
  const embedContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".contact-reveal");
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

  useEffect(() => {
    if (!embedContainerRef.current) return;

    const container = embedContainerRef.current;
    container.innerHTML = "";

    const embedDiv = document.createElement("div");
    embedDiv.setAttribute("data-tf-live", "01KWDYZV6RPWRWSHXMQ5XJX9N0");
    container.appendChild(embedDiv);

    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="contact-grid">

          <div>
            {/* Typing heading — hook controls visibility */}
            <h2
              ref={headRef as React.RefObject<HTMLHeadingElement>}
              className={!done ? "typing-cursor" : ""}
              style={{ fontSize: "clamp(2.25rem,3.5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.98, marginBottom: 20, color: "var(--ink)" }}
            >
              <TypedText full={HEADING} shown={displayed} />
            </h2>
            <p className="contact-reveal reveal delay-2" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginBottom: 32, maxWidth: 420 }}>
              Book a free 30-minute strategy call. We&rsquo;ll dig into your challenge and tell you exactly how we&rsquo;d approach it. No fluff, no hard sell.
            </p>
            <div className="contact-reveal reveal delay-3" style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
              {[
                { icon: "mail", text: "info@acqron.com" },
                { icon: "pin", text: "Bacolod City, Philippines" },
                { icon: "clock", text: "Response within 24 hours" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(26,25,22,0.28)" strokeWidth="1.5">
                    {row.icon === "mail" && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                    {row.icon === "pin" && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
                    {row.icon === "clock" && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                  </svg>
                  {row.icon === "mail"
                    ? <a href="mailto:info@acqron.com" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--muted)", textDecoration: "none" }}>{row.text}</a>
                    : <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--muted)" }}>{row.text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="contact-reveal reveal delay-2" style={{ border: "0.9px solid var(--border)", borderRadius: 2, padding: "32px 28px", position: "relative", overflow: "hidden", boxShadow: "0 2px 24px rgba(26,25,22,0.05)" }}>
            <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 20, height: 20, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)" }} />

            <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 10 }}>Start with a short Typeform</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--muted)", marginBottom: 20 }}>
                We&rsquo;ll use your Typeform to capture the details and follow up quickly.
              </div>
              <div ref={embedContainerRef} style={{ width: "100%", minHeight: 420, maxHeight: 540 }} />
              <p style={{ textAlign: "center", fontSize: 11, fontWeight: 500, color: "var(--muted-2)", marginTop: 10 }}>Free · 30 minutes · No commitment required</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .contact-grid{grid-template-columns:1fr!important;gap:44px!important} }
      `}</style>
    </section>
  );
}

