"use client";
import React, { useEffect, useRef } from "react";
import { useTyping } from "@/hooks/useTyping";
import { useWordFade } from "@/hooks/useWordFade";
import TypedText from "@/components/TypedText";

const HEADING = "Map your firm. Build the right system. Make your team self-sufficient.";
const SUBTITLE = "Three phases. One partner. From first conversation to your team running it confidently.";

const cards = [
  {
    title: "We map how\nyour firm works.",
    step: "/1",
    desc: "Every engagement starts with deep discovery. We audit your workflows, interview your team, and identify exactly where deals, cases, or filings are slipping through the cracks, before we write a single line of code.",
    mockup: "audit",
  },
  {
    title: "We build fast\nand iteratively.",
    step: "/2",
    desc: "You see working software every week, not at the end of the project. We build in sprints, ship early, and adjust based on real feedback, so there are no surprises at launch.",
    mockup: "sprint",
  },
  {
    title: "We train until\nyou own it.",
    step: "/3",
    desc: "We don't disappear after launch. We run training sessions, document every system, and stay until your whole team (agents, paralegals, or accountants) runs it confidently without needing us.",
    mockup: "adoption",
  },
];

export default function WhatWeBuild() {
  const { ref: headRef, displayed, done } = useTyping(HEADING, 30);
  const subRef = useWordFade(SUBTITLE, 38);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".feat-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="learn" style={{ padding: "var(--section-py) 0" }}>
      <div className="container">

        {/* Typing heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 72px)" }}>
          <h2
            ref={headRef as React.RefObject<HTMLHeadingElement>}
            className={!done ? "typing-cursor" : ""}
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: "-0.04em",
              maxWidth: "18em", margin: "0 auto 16px",
              color: "var(--ink)",
              overflowWrap: "break-word",
            }}
          >
            <TypedText full={HEADING} shown={displayed} />
          </h2>
          {/* Apple word-fade subtitle */}
          <p
            ref={subRef as React.RefObject<HTMLParagraphElement>}
            className="word-fade-up"
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.6,
              color: "var(--muted)",
              letterSpacing: "-0.02em",
              maxWidth: "36em",
              margin: "0 auto",
            }}
          >
            {/* Full text for crawlers; useWordFade replaces it with animated word spans on mount */}
            <span className="sr-only">{SUBTITLE}</span>
          </p>
        </div>

        {/* Feature cards — square 1/1 */}
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--card-gap)" }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className={`feat-reveal reveal delay-${i + 1}`}
              style={{
                background: "var(--dark-bg)",
                border: "0.9px solid var(--dark-border)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 40px rgba(0,0,0,0.20)",
                aspectRatio: "1 / 1",
              }}
            >
              <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 20, height: 20, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)", zIndex: 3 }} />

              {/* Header row: title + step number */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "clamp(16px, 1.8vw, 24px) clamp(16px, 1.8vw, 24px) 0" }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.15, color: "var(--wordmark)", maxWidth: "70%", whiteSpace: "pre-line" }}>
                  {c.title}
                </h3>
                <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.035em", color: "rgba(245,245,244,0.18)", flexShrink: 0 }}>{c.step}</span>
              </div>

              {/* Mockup — fills remaining space */}
              <div style={{ flex: 1, margin: "clamp(10px, 1.2vw, 16px) clamp(10px, 1.2vw, 16px) 0", borderRadius: "2px 2px 0 0", overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "0.9px solid rgba(255,255,255,0.06)", borderBottom: "none", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px, 1.5vw, 20px)" }}>
                <MockupCard type={c.mockup} />
              </div>

              {/* Description — anchored bottom */}
              <p style={{ fontSize: 12, lineHeight: 1.6, letterSpacing: "-0.01em", color: "rgba(245,245,244,0.5)", padding: "clamp(10px, 1vw, 14px) clamp(16px, 1.8vw, 24px) clamp(14px, 1.5vw, 20px)", borderTop: "0.9px solid var(--dark-border)" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feat-grid > div { aspect-ratio: 1 / 1 !important; }
        }
        @media (max-width: 560px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .feat-grid > div { aspect-ratio: 4 / 3 !important; }
        }
      `}</style>
    </section>
  );
}

function WorkflowGraph() {
  // Nodes: [id, label, x%, y%, color]
  const nodes = [
    { id: "intake",   label: "Client Intake",    x: 50,  y: 8,  color: "#EF4444" },
    { id: "review",   label: "Review",            x: 18,  y: 38, color: "#F97316" },
    { id: "docs",     label: "Docs",              x: 82,  y: 38, color: "#F97316" },
    { id: "approve",  label: "Approval",          x: 50,  y: 62, color: "#F59E0B" },
    { id: "notify",   label: "Notify",            x: 18,  y: 88, color: "#16a34a" },
    { id: "close",    label: "Close",             x: 82,  y: 88, color: "#16a34a" },
  ];

  // Edges: [from, to] — indices into nodes array
  const edges = [
    [0, 1], [0, 2],
    [1, 3], [2, 3],
    [3, 4], [3, 5],
  ];

  const PULSE_DURATION = 900; // ms per edge
  const PAUSE = 200;
  const TOTAL = edges.length * (PULSE_DURATION + PAUSE);

  return (
    <div style={{ width: "100%", height: "100%", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <svg
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            {edges.map(([fi, ti], ei) => {
              const f = nodes[fi], t = nodes[ti];
              const dx = t.x - f.x, dy = t.y - f.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const delay = ei * (PULSE_DURATION + PAUSE);
              return (
                <style key={ei}>{`
                  @keyframes pulse-${ei} {
                    0%,${(delay/TOTAL*100).toFixed(1)}% { stroke-dashoffset: ${len.toFixed(1)}; opacity: 0; }
                    ${((delay+80)/TOTAL*100).toFixed(1)}% { opacity: 1; }
                    ${((delay+PULSE_DURATION)/TOTAL*100).toFixed(1)}% { stroke-dashoffset: 0; opacity: 1; }
                    ${((delay+PULSE_DURATION+100)/TOTAL*100).toFixed(1)}%,100% { stroke-dashoffset: 0; opacity: 0; }
                  }
                `}</style>
              );
            })}
          </defs>

          {/* Static edge lines */}
          {edges.map(([fi, ti], ei) => {
            const f = nodes[fi], t = nodes[ti];
            return (
              <line key={ei}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"
              />
            );
          })}

          {/* Animated pulse lines */}
          {edges.map(([fi, ti], ei) => {
            const f = nodes[fi], t = nodes[ti];
            const dx = t.x - f.x, dy = t.y - f.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            return (
              <line key={ei}
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="url(#wf-grad)" strokeWidth="1.2" strokeLinecap="round"
                strokeDasharray={len.toFixed(1)}
                strokeDashoffset={len.toFixed(1)}
                style={{
                  animation: `pulse-${ei} ${TOTAL}ms linear infinite`,
                  animationDelay: "0ms",
                }}
              />
            );
          })}

          {/* Node circles */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="6.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <circle cx={n.x} cy={n.y} r="3.5" fill={n.color} />
            </g>
          ))}

          {/* Node labels */}
          {nodes.map((n, i) => {
            const isTop = n.y < 20;
            const isLeft = n.x < 35;
            const isRight = n.x > 65;
            const dy = isTop ? -10 : 10;
            const anchor = isLeft ? "end" : isRight ? "start" : "middle";
            const dx = isLeft ? -10 : isRight ? 10 : 0;
            return (
              <text key={i}
                x={n.x + dx} y={n.y + dy}
                textAnchor={anchor}
                style={{ fontSize: "5.5px", fontWeight: 700, fill: "rgba(245,245,244,0.45)", fontFamily: "inherit", letterSpacing: "0.02em" }}
              >
                {n.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Tetris engine ──────────────────────────────────────────────────────────
const TC = 8;  // cols
const TR = 12; // rows
const TGAP = 0.6;
const TCELL = 10;

type TGrid = (string | null)[][];

// Pieces: cells relative to top-left, color
const T_PIECES: { cells: [number, number][]; color: string }[] = [
  { cells: [[0,0],[1,0],[2,0],[3,0]], color: "#EF4444" }, // I — fills whole row nicely
  { cells: [[0,0],[1,0],[0,1],[1,1]], color: "#F97316" }, // O
  { cells: [[1,0],[0,1],[1,1],[2,1]], color: "#F59E0B" }, // T
  { cells: [[0,0],[0,1],[1,1],[2,1]], color: "#EF4444" }, // J
  { cells: [[2,0],[0,1],[1,1],[2,1]], color: "#F97316" }, // L
  { cells: [[0,0],[1,0],[2,0],[3,0]], color: "#F59E0B" }, // I again (bias toward row-fillers)
  { cells: [[0,0],[1,0],[2,0],[3,0]], color: "#EF4444" }, // I again
  { cells: [[0,0],[1,0],[0,1],[1,1]], color: "#F97316" }, // O
];

// Sequence of (pieceIdx, colOffset) chosen to fill rows perfectly
// 8 cols: two I pieces = 1 full row, repeat; mix Os and Ts for variety
const T_SEQUENCE: [number, number][] = [
  [0,0],[0,4],   // row 11: two I pieces → full row
  [0,0],[0,4],   // row 10
  [1,0],[1,2],[1,4],[1,6], // row 9-8: four O pieces → 2 full rows
  [0,0],[0,4],   // row 7
  [2,0],[2,3],[0,0],[2,5], // T + T + I
  [0,0],[0,4],   // row
  [1,0],[1,2],[1,4],[1,6], // 4 Os
];

function emptyGrid(): TGrid {
  return Array.from({ length: TR }, () => Array(TC).fill(null));
}

function dropPiece(grid: TGrid, cells: [number, number][], col: number): number {
  const maxDr = cells.reduce((m, [, r]) => Math.max(m, r), 0);
  let landRow = 0;
  for (let dr = 0; dr <= TR - 1 - maxDr; dr++) {
    const blocked = cells.some(([dc, drow]) => {
      const r = dr + 1 + drow, c = col + dc;
      return r >= TR || grid[r]?.[c] != null;
    });
    if (blocked) break;
    landRow = dr;
  }
  return landRow;
}

function placePiece(grid: TGrid, cells: [number, number][], col: number, row: number, color: string): TGrid {
  const g = grid.map(r => [...r]);
  cells.forEach(([dc, dr]) => { g[row + dr][col + dc] = color; });
  return g;
}

function clearFullRows(grid: TGrid): { grid: TGrid; cleared: number[] } {
  const cleared: number[] = [];
  let g = grid.filter((row, i) => {
    if (row.every(c => c !== null)) { cleared.push(i); return false; }
    return true;
  });
  while (g.length < TR) g = [Array(TC).fill(null), ...g];
  return { grid: g, cleared };
}

type TFrame =
  | { type: "drop"; grid: TGrid; cells: [number, number][]; col: number; dropRow: number; color: string }
  | { type: "flash"; grid: TGrid; rows: number[] }
  | { type: "clear"; grid: TGrid }
  | { type: "pause"; grid: TGrid };

function buildTetrisFrames(): TFrame[] {
  const frames: TFrame[] = [];
  let grid = emptyGrid();

  for (const [pi, col] of T_SEQUENCE) {
    const piece = T_PIECES[pi];
    const safeCol = Math.min(col, TC - 1 - piece.cells.reduce((m, [c]) => Math.max(m, c), 0));
    const landRow = dropPiece(grid, piece.cells, safeCol);

    // Emit falling frames (step 2 rows at a time for speed)
    for (let dr = 0; dr <= landRow; dr += 2) {
      frames.push({ type: "drop", grid, cells: piece.cells, col: safeCol, dropRow: Math.min(dr, landRow), color: piece.color });
    }
    // Ensure last drop frame lands exactly
    frames.push({ type: "drop", grid, cells: piece.cells, col: safeCol, dropRow: landRow, color: piece.color });

    // Commit piece
    grid = placePiece(grid, piece.cells, safeCol, landRow, piece.color);

    const { grid: clearedGrid, cleared } = clearFullRows(grid);
    if (cleared.length > 0) {
      // Flash the completed rows 3 times
      for (let f = 0; f < 3; f++) {
        frames.push({ type: "flash", grid, rows: cleared });
        frames.push({ type: "clear", grid: clearedGrid });
      }
      grid = clearedGrid;
      frames.push({ type: "pause", grid });
    }
  }

  // Hold final state, then wipe
  for (let i = 0; i < 10; i++) frames.push({ type: "pause", grid });
  frames.push({ type: "clear", grid: emptyGrid() });

  return frames;
}

function TetrisBlocks() {
  const framesRef = React.useRef<TFrame[]>([]);
  const idxRef = React.useRef(0);
  const [frame, setFrame] = React.useState<TFrame | null>(null);

  React.useEffect(() => {
    framesRef.current = buildTetrisFrames();
    setFrame(framesRef.current[0]);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      idxRef.current += 1;
      if (idxRef.current >= framesRef.current.length) {
        framesRef.current = buildTetrisFrames();
        idxRef.current = 0;
      }
      setFrame(framesRef.current[idxRef.current]);
    }, 60);
    return () => clearInterval(id);
  }, []);

  const W = TC * TCELL;
  const H = TR * TCELL;

  // Render grid from frame
  const renderGrid = (g: TGrid) =>
    g.flatMap((row, r) =>
      row.map((color, c) =>
        color ? (
          <rect key={`${r}-${c}`}
            x={c * TCELL + TGAP} y={r * TCELL + TGAP}
            width={TCELL - TGAP * 2} height={TCELL - TGAP * 2}
            rx={1.5} fill={color} opacity={0.9}
          />
        ) : null
      )
    );

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", maxHeight: "100%" }} preserveAspectRatio="xMidYMid meet">
        {/* Grid background cells */}
        {Array.from({ length: TR }, (_, r) =>
          Array.from({ length: TC }, (_, c) => (
            <rect key={`bg-${r}-${c}`}
              x={c * TCELL + TGAP} y={r * TCELL + TGAP}
              width={TCELL - TGAP * 2} height={TCELL - TGAP * 2}
              rx={1.5} fill="rgba(255,255,255,0.04)"
            />
          ))
        )}

        {frame?.type === "drop" && (
          <>
            {renderGrid(frame.grid)}
            {/* Falling piece */}
            {frame.cells.map(([dc, dr], i) => (
              <rect key={`f-${i}`}
                x={(frame.col + dc) * TCELL + TGAP}
                y={(frame.dropRow + dr) * TCELL + TGAP}
                width={TCELL - TGAP * 2} height={TCELL - TGAP * 2}
                rx={1.5} fill={frame.color} opacity={1}
              />
            ))}
            {/* Ghost piece (landing preview) */}
            {frame.cells.map(([dc, dr], i) => {
              const landRow = dropPiece(frame.grid, frame.cells, frame.col);
              if (landRow === frame.dropRow) return null;
              return (
                <rect key={`g-${i}`}
                  x={(frame.col + dc) * TCELL + TGAP}
                  y={(landRow + dr) * TCELL + TGAP}
                  width={TCELL - TGAP * 2} height={TCELL - TGAP * 2}
                  rx={1.5} fill={frame.color} opacity={0.15}
                />
              );
            })}
          </>
        )}

        {frame?.type === "flash" && (
          <>
            {renderGrid(frame.grid)}
            {/* Flash the cleared rows white */}
            {frame.rows.map(r => (
              <rect key={`fl-${r}`}
                x={0} y={r * TCELL}
                width={W} height={TCELL}
                fill="rgba(255,255,255,0.6)"
              />
            ))}
          </>
        )}

        {(frame?.type === "clear" || frame?.type === "pause") && renderGrid(frame.grid)}
      </svg>
    </div>
  );
}

// UI waypoints the cursor visits: [x%, y%, elementKey]
const WAYPOINTS = [
  { x: 62, y: 28, key: "stat1" },
  { x: 82, y: 28, key: "stat2" },
  { x: 62, y: 52, key: "btn1"  },
  { x: 82, y: 52, key: "btn2"  },
  { x: 72, y: 74, key: "bar"   },
];

const TOTAL_MS = 5000;   // one full pass (training or client)
const HANDOFF_MS = 500;  // pause between phases

function lerpPt(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function getCursorPos(progress: number): { x: number; y: number; active: string } {
  const count = WAYPOINTS.length;
  const seg = 1 / count;
  const idx = Math.min(Math.floor(progress / seg), count - 1);
  const local = easeInOut((progress - idx * seg) / seg);
  const from = WAYPOINTS[idx];
  const to = WAYPOINTS[(idx + 1) % count];
  return { ...lerpPt(from, to, local), active: from.key };
}

function HandoffAnimation() {
  const [t, setT] = React.useState(0); // 0→1: training, 1→2: client, loops
  const startRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const loop = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const cycleDur = TOTAL_MS * 2 + HANDOFF_MS * 2;
      const phase = elapsed % cycleDur;

      if (phase < TOTAL_MS) {
        // Training phase: 0→1
        setT(phase / TOTAL_MS);
      } else if (phase < TOTAL_MS + HANDOFF_MS) {
        setT(1);
      } else if (phase < TOTAL_MS * 2 + HANDOFF_MS) {
        // Client phase: 1→2
        setT(1 + (phase - TOTAL_MS - HANDOFF_MS) / TOTAL_MS);
      } else {
        setT(2);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const isTraining = t <= 1;
  const progress = t <= 1 ? t : t - 1;
  const cursor = getCursorPos(progress);

  // Fade: training cursor fades out as t→1, client cursor fades in as t→1
  const trainingOpacity = isTraining ? 1 : 0;
  const clientOpacity = isTraining ? 0 : 1;

  const activeKey = cursor.active;

  // Status label
  const statusLabel = isTraining ? "Acqron · Training" : "Client · Running Solo";
  const statusColor = isTraining ? "#F97316" : "#16a34a";

  const highlighted = (key: string) => activeKey === key ? "rgba(255,255,255,0.10)" : "transparent";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Mock UI */}
      <div style={{ flex: 1, display: "flex", gap: 0, position: "relative", minHeight: 0 }}>

        {/* Sidebar */}
        <div style={{ width: "28%", borderRight: "0.9px solid rgba(255,255,255,0.07)", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
          {["Dashboard","Clients","Reports","Settings"].map((item, i) => (
            <div key={i} style={{ fontSize: 8, fontWeight: 600, color: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)", letterSpacing: "0.02em", padding: "5px 7px", borderRadius: 3, background: i === 0 ? "rgba(255,255,255,0.07)" : "transparent" }}>
              {item}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, padding: "10px 10px 6px", display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
          {/* Stat cards row */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { label: "Active Clients", val: "24", key: "stat1" },
              { label: "This Month", val: "₱2.4M", key: "stat2" },
            ].map(s => (
              <div key={s.key} style={{ flex: 1, background: highlighted(s.key), border: "0.9px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "7px 8px", transition: "background 200ms" }}>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { label: "New Report", key: "btn1", accent: true },
              { label: "Export",     key: "btn2", accent: false },
            ].map(b => (
              <div key={b.key} style={{ flex: 1, padding: "6px 8px", borderRadius: 4, background: highlighted(b.key) || (b.accent ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)"), border: `0.9px solid ${b.accent ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`, transition: "background 200ms", textAlign: "center" }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: b.accent ? "#F97316" : "rgba(255,255,255,0.5)" }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div key="bar" style={{ background: highlighted("bar"), border: "0.9px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "7px 8px", transition: "background 200ms" }}>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 5 }}>Q4 Progress</div>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "72%", borderRadius: 2, background: "linear-gradient(90deg,#EF4444,#F97316,#F59E0B)" }} />
            </div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>72% of target reached</div>
          </div>

          {/* Cursors — positioned absolutely inside main panel */}
          {/* Training cursor (orange) */}
          <div style={{
            position: "absolute",
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            opacity: trainingOpacity,
            transition: "opacity 400ms",
            pointerEvents: "none",
            zIndex: 10,
          }}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M1 1l11 7-5 1-3 6L1 1z" fill="#F97316" stroke="#fff" strokeWidth="0.8"/>
            </svg>
            <div style={{ fontSize: 7, fontWeight: 700, color: "#F97316", background: "rgba(17,17,16,0.85)", padding: "2px 5px", borderRadius: 3, marginTop: 2, whiteSpace: "nowrap" }}>Acqron</div>
          </div>

          {/* Client cursor (white) */}
          <div style={{
            position: "absolute",
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            opacity: clientOpacity,
            transition: "opacity 400ms",
            pointerEvents: "none",
            zIndex: 10,
          }}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M1 1l11 7-5 1-3 6L1 1z" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
            </svg>
            <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: "rgba(17,17,16,0.85)", padding: "2px 5px", borderRadius: 3, marginTop: 2, whiteSpace: "nowrap" }}>Client</div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ borderTop: "0.9px solid rgba(255,255,255,0.07)", padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor, transition: "background 400ms", flexShrink: 0 }} />
        <span style={{ fontSize: 8, fontWeight: 700, color: statusColor, letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 400ms" }}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

function MockupCard({ type }: { type: string }) {
  const card: React.CSSProperties = { background: "#fff", borderRadius: 2, padding: 18, width: "100%", boxShadow: "0 12px 48px rgba(0,0,0,.16)" };
  const label: React.CSSProperties = { fontSize: 9, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "#a3a39f", marginBottom: 10 };
  const bar = (w: string, bg = "#e5e5e3"): React.CSSProperties => ({ height: 7, borderRadius: 2, background: bg, marginBottom: 6, width: w });
  const pill = (orange?: boolean): React.CSSProperties => ({ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 9999, fontSize: 9, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", background: orange ? "rgba(249,115,22,0.1)" : "rgba(22,163,74,0.1)", color: orange ? "#F97316" : "#16a34a" });
  const prog: React.CSSProperties = { height: 3, borderRadius: 2, background: "#e5e5e3", overflow: "hidden", marginTop: 8 };
  const fill = (w: string, bg = "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)"): React.CSSProperties => ({ height: "100%", borderRadius: 2, background: bg, width: w });

  if (type === "audit") return <WorkflowGraph />;
  if (type === "sprint") return <TetrisBlocks />;
  if (type === "adoption") return <HandoffAnimation />;

  return (
    <div style={card}>
      <div style={label}>Team Adoption</div>
      {[
        { done: true, w: "75%", tag: "Trained", orange: false },
        { done: true, w: "60%", tag: "Trained", orange: false },
        { done: false, w: "50%", tag: "Active", orange: true },
      ].map((row, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: row.done ? "rgba(22,163,74,.1)" : "rgba(249,115,22,.08)", border: `0.9px solid ${row.done ? "rgba(22,163,74,.25)" : "rgba(249,115,22,.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {row.done
              ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316" }} />}
          </div>
          <div style={{ flex: 1, ...bar(row.w, row.done ? "#d1fae5" : "#e5e5e3"), marginBottom: 0 }} />
          <span style={pill(row.orange)}>{row.tag}</span>
        </div>
      ))}
      <div style={prog}><div style={fill("67%")} /></div>
      <div style={{ marginTop: 6, fontSize: 9, color: "#a3a39f", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>2 of 3 team members ready</div>
    </div>
  );
}
