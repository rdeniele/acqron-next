"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  { name: "Roland Spear", initials: "RS", quote: "Acqron built us a lead and listing management system that replaced three separate tools we were paying for. Our agents adopted it immediately. It was built the way they actually work." },
  { name: "Emily Uselman", initials: "EU", quote: "Pages look amazing! Great job! I'm always happy working with the team at Acqron. Worked with Ron for quite a while now in almost half a dozen projects and they have always delivered" },
  { name: "Vinesh Guthari", initials: "VG", quote: "Professional, responsive, and results-driven. Acqron transformed our vision into a beautiful, functional product." },
  { name: "James Brian Leslie", initials: "JL", quote: "Working with Acqron felt like having a technical co-founder who actually understood real estate. They knew the terminology, the workflows, and what our team needed before we even had to explain it." },
];

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    const next = ((i % testimonials.length) + testimonials.length) % testimonials.length;
    if (next === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
    }, 220);
  };

  const restartAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % testimonials.length);
        setFading(false);
      }, 220);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => {
    switchTo(i);
    restartAutoplay();
  };

  return (
    <section ref={sectionRef} id="testimonials" style={{ background: "var(--dark-bg)", color: "#fff", padding: "var(--section-py) 0" }}>
      <div className="container">
        <div className="testi-reveal reveal delay-1" style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(1.75rem,2.8vw,2.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#fff" }}>
            What Acqron&rsquo;s previous clients have to say.
          </h2>
        </div>

        {/* Carousel */}
        <div className="testi-reveal reveal delay-2" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ opacity: fading ? 0 : 1, transition: "opacity 220ms var(--ease)", minHeight: 220 }}>
            <blockquote style={{ fontSize: "clamp(1.125rem,1.8vw,1.4rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.4, color: "#fff", marginBottom: 28 }}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "0.9px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, color: "#fff" }}>
                {testimonials[active].initials}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>{testimonials[active].name}</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 40 }}>
            <button
              aria-label="Previous testimonial"
              onClick={() => go(active - 1)}
              style={{ width: 36, height: 36, borderRadius: "50%", border: "0.9px solid rgba(255,255,255,0.15)", background: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  style={{
                    width: 8, height: 8, borderRadius: "50%", padding: 0, cursor: "pointer",
                    border: "none",
                    background: active === i ? "#fff" : "rgba(255,255,255,0.25)",
                    transition: "background 200ms",
                  }}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(active + 1)}
              style={{ width: 36, height: 36, borderRadius: "50%", border: "0.9px solid rgba(255,255,255,0.15)", background: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
