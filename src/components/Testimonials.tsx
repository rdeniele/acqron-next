"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  { name: "Roland Spear", role: "Principal Broker, Real Estate Firm", initials: "RS", quote: "Acqron built us a lead and listing management system that replaced three separate tools we were paying for. Our agents adopted it immediately. It was built the way they actually work." },
  { name: "Emily Uselman", role: "Chief Marketing Officer, Real Estate Group", initials: "EU", quote: "Pages look amazing! Great job! I'm always happy working with the team at Acqron. Worked with Ron for quite a while now in almost half a dozen projects and they have always delivered" },
  { name: "Vinesh Guthari", role: "Acqron client, 2025", initials: "VG", quote: "Professional, responsive, and results-driven. Acqron transformed our vision into a beautiful, functional product." },
  { name: "James Brian Leslie", role: "Founder, Real Estate Brokerage", initials: "JL", quote: "Working with Acqron felt like having a technical co-founder who actually understood real estate. They knew the terminology, the workflows, and what our team needed before we even had to explain it." },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".testi-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const switchTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 220);
  };

  return (
    <section ref={sectionRef} id="testimonials" style={{ background: "var(--dark-bg)", color: "#fff", padding: "var(--section-py) 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="testi-grid">

          {/* Left — tab list */}
          <div className="testi-reveal reveal delay-1">
            <h2 style={{ fontSize: "clamp(1.75rem,2.8vw,2.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#fff", marginBottom: 44 }}>
              What Acqron&rsquo;s previous clients <br/> have to say.
            </h2>
            <div style={{ borderTop: "0.9px solid rgba(255,255,255,0.08)" }}>
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => switchTo(i)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 0",
                    borderTop: "none", borderLeft: "none", borderRight: "none",
                    borderBottom: "0.9px solid rgba(255,255,255,0.08)",
                    width: "100%", background: "none", cursor: "pointer",
                    fontFamily: "inherit", fontSize: 14, fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: active === i ? "#fff" : "rgba(255,255,255,0.3)",
                    transition: "color 200ms",
                  }}
                >
                  {t.name}
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "0.9px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", opacity: active === i ? 1 : 0, transition: "opacity 200ms" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — quote panel with fade */}
          <div className="testi-reveal reveal delay-2" style={{ opacity: fading ? 0 : 1, transition: "opacity 220ms var(--ease)" }}>
            <blockquote style={{ fontSize: "clamp(1.125rem,1.8vw,1.4rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.4, color: "#fff", marginBottom: 36 }}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "0.9px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, color: "#fff" }}>
                {testimonials[active].initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>{testimonials[active].name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{testimonials[active].role}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`@media(max-width:768px){ .testi-grid { grid-template-columns:1fr !important; gap:44px !important; } }`}</style>
    </section>
  );
}
