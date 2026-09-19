"use client";
import { useEffect, useRef, useState } from "react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".faq-reveal");
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
    <section ref={sectionRef} id="faq" aria-labelledby="faq-heading" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <h2
            id="faq-heading"
            className="faq-reveal reveal"
            style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em", maxWidth: 580, marginTop: 14, marginBottom: 14, color: "var(--ink)" }}
          >
            Web design and development questions, answered.
          </h2>
          <p className="faq-reveal reveal delay-1" style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", letterSpacing: "-0.02em", maxWidth: 440 }}>
            What Acqron builds, where Acqron is based, how long projects take, and how to get started.
          </p>
        </div>

        <ul style={{ borderTop: "0.9px solid var(--border)", listStyle: "none" }}>
          {faqs.map((f, i) => (
            <li key={f.q} className={`faq-reveal reveal delay-${Math.min(i + 1, 5)}`} style={{ borderBottom: "0.9px solid var(--border)" }}>
              <h3>
                <button
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-a-${i}`}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 16, padding: "24px 0", width: "100%", textAlign: "left",
                    cursor: "pointer", background: "none", border: "none", fontFamily: "inherit",
                    fontSize: "clamp(1.0625rem,1.6vw,1.5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)",
                  }}
                >
                  {f.q}
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: open === i ? "var(--ink-2)" : "transparent", transition: "background 180ms, border-color 180ms" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open === i ? "#fbfbf9" : "var(--ink)"} strokeWidth="2" aria-hidden="true" style={{ transition: "transform 280ms var(--ease)", transform: open === i ? "rotate(45deg)" : "none" }}>
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
              </h3>
              {/* Answers stay in the DOM when collapsed so crawlers and AI assistants can read them */}
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`svc-panel ${open === i ? "open" : ""}`}>
                <div className="svc-panel-inner">
                  <p style={{ paddingBottom: 28, maxWidth: 720, fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.01em", color: "var(--muted)" }}>{f.a}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
