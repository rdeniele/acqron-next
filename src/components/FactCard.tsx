"use client";
import { useEffect, useId, useRef, useState } from "react";

export type FactDetail = {
  title: string;
  intro: string;
  points?: string[];
  steps?: string[];
  acqron: string;
};

export type Fact = {
  stat: string;
  label: string;
  source: string;
  large?: boolean;
  detail: FactDetail;
};

type Placement = { left: number; top: number; side: "above" | "below" | "left" | "right" };

const GAP = 12;    // space between card and popover
const MARGIN = 12; // minimum distance from the viewport edge

/**
 * A stat card with a hover / tap / focus detail popover.
 * The card itself is untouched (it keeps overflow:hidden). The popover is a sibling inside a
 * display:contents slot, so it is never clipped by the card, can be hovered without closing,
 * and is positioned in JS so it always stays inside the viewport.
 * Its text stays in the DOM while closed so it remains readable to crawlers and assistive tech.
 */
export default function FactCard({ fact, gridStyle }: { fact: Fact; gridStyle?: React.CSSProperties }) {
  const { stat, label, source, large = false, detail } = fact;
  const uid = useId();
  const popId = `${uid}-detail`;
  const titleId = `${uid}-title`;

  const slotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLElement>(null);
  const pointerType = useRef("mouse");
  const timer = useRef(0);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement | null>(null);

  const place = () => {
    const card = cardRef.current;
    const pop = popRef.current;
    if (!card || !pop) return;
    const r = card.getBoundingClientRect();
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    // keep clear of the fixed nav bar as well as the viewport edges
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
    const topLimit = navH + MARGIN;
    const bottomLimit = vh - MARGIN;
    const clampX = (x: number) => Math.max(MARGIN, Math.min(x, vw - w - MARGIN));
    const clampY = (y: number) => Math.max(topLimit, Math.min(y, bottomLimit - h));
    const centredX = r.left + r.width / 2 - w / 2;

    // Prefer above, then below, then beside the card; only overlap the card as a last resort
    let left: number;
    let top: number;
    let side: Placement["side"];
    if (r.top - GAP - h >= topLimit) {
      side = "above"; left = clampX(centredX); top = r.top - GAP - h;
    } else if (r.bottom + GAP + h <= bottomLimit) {
      side = "below"; left = clampX(centredX); top = r.bottom + GAP;
    } else if (r.right + GAP + w <= vw - MARGIN) {
      side = "right"; left = r.right + GAP; top = clampY(r.top);
    } else if (r.left - GAP - w >= MARGIN) {
      side = "left"; left = r.left - GAP - w; top = clampY(r.top);
    } else {
      side = r.top - topLimit > bottomLimit - r.bottom ? "above" : "below";
      left = clampX(centredX);
      top = clampY(side === "above" ? r.top - GAP - h : r.bottom + GAP);
    }
    // the popover is absolutely positioned against the grid, so express the result relative to it
    const host = pop.offsetParent as HTMLElement | null;
    const h0 = host ? host.getBoundingClientRect() : { left: 0, top: 0 };
    setPlacement({ left: left - h0.left - (host?.clientLeft ?? 0), top: top - h0.top - (host?.clientTop ?? 0), side });
  };

  const show = () => {
    window.clearTimeout(timer.current);
    place();
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };
  const toggle = () => {
    if (open) hide();
    else show();
  };
  const showSoon = () => {
    // Tiny intent delay so sweeping the cursor across the grid doesn't flash every popover
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(show, 70);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    const onDown = (e: PointerEvent) => {
      if (slotRef.current && !slotRef.current.contains(e.target as Node)) hide();
    };
    const onResize = () => hide();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const cardStyle: React.CSSProperties = {
    ...gridStyle,
    borderRadius: 2,
    overflow: "hidden",
    position: "relative",
    background: large ? "var(--ink)" : "var(--cream)",
    border: "0.9px solid var(--border)",
    padding: "clamp(20px, 3vw, 36px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    aspectRatio: large ? undefined : "16 / 10",
    // consumed by .fact-toggle so the touch affordance lines up with the card padding
    ["--fact-pad" as string]: "clamp(20px, 3vw, 36px)",
    ["--fact-fg" as string]: large ? "rgba(245,245,244,0.7)" : "var(--ink)",
  };

  return (
    <div
      ref={slotRef}
      className={`fact-slot${open ? " is-open" : ""}`}
      onPointerEnter={(e) => { pointerType.current = e.pointerType; if (e.pointerType === "mouse") showSoon(); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") hide(); }}
    >
      <div
        ref={cardRef}
        className="fact-card"
        style={cardStyle}
        onPointerDown={(e) => { pointerType.current = e.pointerType; }}
        // Touch and pen users tap the card; mouse users already get hover, so a click must not close it
        onClick={() => { if (pointerType.current !== "mouse") toggle(); }}
      >
        {large && (
          <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 20, height: 20, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)" }} />
        )}
        <div style={{
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
          fontSize: large ? "clamp(3.5rem,8vw,6rem)" : "clamp(1.75rem,4vw,2.75rem)",
          color: large ? "#fff" : "var(--ink)",
          marginBottom: large ? 32 : 12,
        }}>
          {stat}
        </div>
        <div>
          <p style={{
            fontSize: large ? 15 : 12,
            lineHeight: 1.55,
            letterSpacing: "-0.02em",
            color: large ? "rgba(245,245,244,0.65)" : "var(--muted)",
            marginBottom: 10,
          }}>
            {label}
          </p>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: large ? "rgba(245,245,244,0.28)" : "var(--muted-2)",
          }}>
            {source}
          </span>
        </div>

        {/* Keyboard + touch affordance: hidden for mouse users, shown on touch devices and on keyboard focus */}
        <button
          type="button"
          className="fact-toggle"
          aria-expanded={open}
          aria-controls={popId}
          aria-label={`More about ${stat}: ${detail.title}`}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) show(); }}
          onBlur={hide}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" style={{ transition: "transform 200ms var(--ease)", transform: open ? "rotate(45deg)" : "none" }}>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

        {/* Sibling of the card (not a child), so the card's overflow:hidden can't clip it */}
        <aside
          ref={popRef}
          id={popId}
          role="note"
          aria-labelledby={titleId}
          className="fact-pop"
          data-side={placement?.side ?? "above"}
          style={placement ? { left: placement.left, top: placement.top } : undefined}
          // On touch the popover can overlap its card (and the + button), so tapping it dismisses it
          onClick={() => { if (pointerType.current !== "mouse") hide(); }}
        >
          <div className="fact-pop-body">
            <p id={titleId} className="fact-pop-title">{detail.title}</p>
            <p className="fact-pop-text">{detail.intro}</p>
            {detail.points && (
              <ul className="fact-pop-list">
                {detail.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            )}
            {detail.steps && (
              <ol className="fact-pop-steps">
                {detail.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            )}
            <div className="fact-pop-acqron">
              <span className="fact-pop-label">The Acqron approach</span>
              <p className="fact-pop-text fact-pop-strong">{detail.acqron}</p>
            </div>
            <p className="fact-pop-source">Source: {source}</p>
          </div>
        </aside>
    </div>
  );
}
