"use client";
import { useTyping } from "@/hooks/useTyping";
import TypedText from "@/components/TypedText";

const HEADLINE = "Purpose-built software for Real Estate, Law, and Accounting firms.";

export default function Hero() {
  const { ref: titleRef, displayed, done } = useTyping(HEADLINE, 34);

  return (
    <section id="home" style={{ paddingTop: "calc(var(--nav-h) + clamp(48px, 6vw, 96px))", paddingBottom: 0 }}>
      <div className="container">
        <div style={{ minHeight: "64vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Massive display heading */}
          <h1
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={!done ? "typing-cursor" : ""}
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 0.93,
              letterSpacing: "-0.05em",
              maxWidth: "14em",
              color: "var(--ink)",
            }}
          >
            <TypedText full={HEADLINE} shown={displayed} />
          </h1>

          {/* Bottom row — badge + lead + CTA */}
          <div className="hero-reveal" style={{ padding: "clamp(40px, 5vw, 72px) 0 clamp(48px, 6vw, 80px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--orange)",
                animation: "pulse 2.4s ease-in-out infinite",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", letterSpacing: "-0.01em" }}>
                Based in Bacolod City, Philippines
              </span>
            </div>
            <p style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.65, color: "var(--muted)",
              letterSpacing: "-0.02em", marginBottom: 28,
              maxWidth: 1000,
            }}>
              We build the internal tools, client portals, and automation systems that professional services firms actually need, without the bloat of generic software that was never designed for your industry.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#contact" style={orangeBtn}>Work With Us</a>
              <a href="#work" style={ghostBtn}>See Our Work</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "0.9px", background: "var(--border)" }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </section>
  );
}

const base: React.CSSProperties = {
  display: "inline-flex", alignItems: "center",
  padding: "14px 28px", borderRadius: 9999,
  fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em",
  lineHeight: 1, whiteSpace: "nowrap", textDecoration: "none",
  cursor: "pointer",
  transition: "opacity 180ms, box-shadow 250ms",
};
const orangeBtn: React.CSSProperties = {
  ...base, color: "#fff",
  background: "linear-gradient(135deg,#EF4444 0%,#F97316 50%,#F59E0B 100%)",
  boxShadow: "0 2px 16px rgba(249,115,22,0.28)",
};
const ghostBtn: React.CSSProperties = {
  ...base, background: "rgba(26,25,22,0.07)", color: "var(--ink-2)",
};
