"use client";
import { useEffect, useRef, useState } from "react";
import { useTyping } from "@/hooks/useTyping";
import { useWordFade } from "@/hooks/useWordFade";
import TypedText from "@/components/TypedText";

const HEADING = "Ideas turned into reality.";
const SUBTITLE = "Websites, platforms, and tools we've shipped across real estate, short-term rentals, hospitality, and beyond.";

const projects = [
  {
    key: "artbliss",
    cat: "Hospitality · Boutique Lodging",
    title: "Artbliss Hotel",
    fullTitle: "Artbliss Hotel: Boutique Cabin Retreat Website",
    desc: "Marketing site for a design-forward boutique retreat in Washington's Columbia River Gorge, featuring A-frame cabin accommodations. Built to convey a sense of place and convert browsers into bookings.",
    tags: ["Website", "Hospitality", "Booking UX"],
    img: "/work/artbliss.jpg",
    hero: "/work/artbliss.jpg",
    link: "https://www.artblisshotel.com/",
  },
  {
    key: "coastal-haven",
    cat: "Construction · Home Remodeling",
    title: "Coastal Haven Design + Build",
    fullTitle: "Coastal Haven Design + Build: Construction & Remodeling Website",
    desc: "Marketing and portfolio site for a Tampa Bay area residential construction and remodeling firm, showcasing kitchen, bathroom, pool, and home addition projects to drive client inquiries.",
    tags: ["Website", "Construction", "Portfolio"],
    img: "/work/coastal.png",
    hero: "/work/coastal.png",
    link: "https://www.coastalhaven-design-build.com",
  },
  {
    key: "dwell",
    cat: "Vacation Rentals · Property Management",
    title: "Dwell Luxury Rentals",
    fullTitle: "Dwell Luxury Rentals: Flagstaff Vacation Rental Platform",
    desc: "Property management and direct booking site for a luxury vacation rental company in Flagstaff, Arizona, serving both guests looking for premium accommodations and homeowners seeking full-service management.",
    tags: ["Website", "Vacation Rentals", "Property Management"],
    img: "/work/dwell.webp",
    hero: "/work/dwell.webp",
    link: "https://www.dwelluxuryrentals.com",
  },
  {
    key: "hometeam",
    cat: "Vacation Rentals · Hospitality",
    title: "Home Team Luxury Rentals",
    fullTitle: "Home Team Luxury Rentals: Luxury Vacation Rental & Management Platform",
    desc: "Dual-purpose platform for a luxury vacation rental management company, enabling guests to book premium properties across the US while helping property owners maximize their rental ROI through full-service management.",
    tags: ["Website", "Booking Platform", "Property Management"],
    img: "/work/hometeam.jpg",
    hero: "/work/hometeam.jpg",
    link: "https://hometeamluxuryrentals.com",
  },
  {
    key: "simplabots",
    cat: "AI Automation · SaaS",
    title: "SimplaBots",
    fullTitle: "SimplaBots: AI Automation Platform for Small Business",
    desc: "AI agent platform that helps founders and small teams scale operations without hiring, with customizable AI agents handling customer service, lead capture, calls, emails, and content creation around the clock.",
    tags: ["SaaS", "AI / Automation", "React", "Node.js"],
    img: "/work/simplabots.png",
    hero: "/work/simplabots.png",
    link: "https://simplabots.com",
  },
  {
    key: "rise-collective",
    cat: "Real Estate · Multi-Brand Portfolio",
    title: "Rise Collective",
    fullTitle: "Rise Collective: Real Estate & Hospitality Parent Company Site",
    desc: "Central hub for a multi-brand holding company spanning vacation rentals, real estate investment, property management, construction, tax advisory, and lending, connecting guests, investors, and partners across their full ecosystem.",
    tags: ["Website", "Real Estate", "Multi-Brand", "Investment"],
    img: "/work/rise.png",
    hero: "/work/rise.png",
    link: "https://rise-collective.com",
  },
  {
    key: "bnb-turnkey",
    cat: "Real Estate Investment · STR Management",
    title: "BNB Turnkey",
    fullTitle: "BNB Turnkey: Done-For-You Short-Term Rental Investment Platform",
    desc: "End-to-end platform for passive short-term rental investors, covering property selection, interior design, furnishing, and ongoing management so investors earn income without the operational overhead.",
    tags: ["Website", "STR Investing", "Property Management"],
    img: "/work/bnbturnkey.jpg",
    hero: "/work/bnbturnkey.jpg",
    link: "https://bnb-turnkey.com",
  },
  {
    key: "paradiso",
    cat: "Luxury Rentals · Membership Platform",
    title: "Paradiso Homes",
    fullTitle: "Paradiso Homes: Ultra-Luxury Private Residence Network",
    desc: "Membership-based platform giving access to a curated network of ultra-luxury private residences across the US, delivering hotel-level reliability and concierge services in large private homes.",
    tags: ["Website", "Luxury Rentals", "Membership", "Hospitality"],
    img: "/work/paradiso.jpg",
    hero: "/work/paradiso.jpg",
    link: "https://paradiso-homes.com",
  },
  {
    key: "str-report",
    cat: "STR Investing · Community Platform",
    title: "The STR Report",
    fullTitle: "The STR Report: Short-Term Rental Investment Community & Education Hub",
    desc: "Free community platform providing education, market insights, investment strategies, and property analysis tools for short-term rental investors pursuing financial freedom through STR ownership.",
    tags: ["Website", "Community Platform", "STR Investing", "Education"],
    img: "/work/strreport.jpg",
    hero: "/work/strreport.jpg",
    link: "https://thestrreport.com",
  },
  {
    key: "sandkey",
    cat: "Vacation Rentals · Texas Gulf Coast",
    title: "Sand Key Vacation Rentals",
    fullTitle: "Sand Key Vacation Rentals: Texas Gulf Coast Rental Platform",
    desc: "Vacation rental booking and property management site serving Port Aransas, Corpus Christi, Rockport, and Padre Island, offering travelers homes, condos, and townhomes while providing owners full-service rental management.",
    tags: ["Website", "Vacation Rentals", "Booking Platform"],
    img: "/work/sandkey.jpg",
    hero: "/work/sandkey.jpg",
    link: "https://www.sandkeyvacationrentals.com",
  },
  {
    key: "bnb-construction",
    cat: "Construction · STR Renovation",
    title: "BNB Construction",
    fullTitle: "BNB Construction: Short-Term Rental Renovation & Optimization",
    desc: "Construction and renovation company specializing in transforming properties for the short-term rental market, optimizing layouts, finishes, and amenities to increase bookings and maximize revenue for STR owners.",
    tags: ["Website", "Construction", "STR Renovation", "Portfolio"],
    img: "/work/bnbconstruction.png",
    hero: "/work/bnbconstruction.png",
    link: "https://bnbconstruction.co",
  },
  {
    key: "cedar-run",
    cat: "Hospitality · Vacation Resort",
    title: "Cedar Run Resort",
    fullTitle: "Cedar Run Resort: Family & Pet-Friendly Vacation Rentals in Bradenton",
    desc: "Resort booking site for a family and dog-friendly vacation rental community in Bradenton, Florida, featuring 2 and 3-bedroom properties near Anna Maria Island and IMG Academy with full resort amenities.",
    tags: ["Website", "Vacation Rentals", "Hospitality", "Booking UX"],
    img: "/work/cedarrun.png",
    hero: "/work/cedarrun.png",
    link: "https://cedarrunresort.com",
  },
  {
    key: "georepute",
    cat: "Business Intelligence · SaaS",
    title: "GeoRepute",
    fullTitle: "GeoRepute: Strategic Business Intelligence Platform",
    desc: "Landing page for a business intelligence platform that connects market, competitor, and search signals, including how customers are influenced across Google and AI assistants, into a single strategic view of what to do next.",
    tags: ["Website", "SaaS", "Business Intelligence", "AI Search"],
    img: "/work/georepute-intelligence-platform.webp",
    hero: "/work/georepute-intelligence-platform.webp",
    alt: "GeoRepute landing page showing the headline 'Every business should have its own intelligence center' with a dark purple interface",
    link: "https://geo-repute.vercel.app",
  },
  {
    key: "copyup",
    cat: "Marketing Automation · SaaS",
    title: "CopyUp.ai",
    fullTitle: "CopyUp.ai: Organic Marketing Autopilot Landing Page",
    desc: "Product landing page for an organic marketing platform that automates SEO, GEO, AI search, content, and social publishing. Set up your business once and let the platform handle the rest.",
    tags: ["Website", "SaaS", "Marketing", "Landing Page"],
    img: "/work/copyup-ai-organic-marketing.webp",
    hero: "/work/copyup-ai-organic-marketing.webp",
    alt: "CopyUp.ai landing page hero with a laptop showing the dashboard and the headline 'One Hour. Six Months of Organic Marketing.'",
    link: "https://copyup-landing.vercel.app",
  },
  {
    key: "the-cabin-thailand",
    cat: "Healthcare · Residential Treatment",
    title: "The Cabin Thailand",
    fullTitle: "The Cabin: Depression & Mental Health Retreat in Thailand",
    desc: "Treatment-focused landing page for a residential mental health retreat in Thailand, explaining how the program helps, what's included, therapies offered, and the conditions treated, with clear paths to enquire.",
    tags: ["Website", "Healthcare", "Landing Page", "Lead Generation"],
    img: "/work/the-cabin-thailand-mental-health-retreat.webp",
    hero: "/work/the-cabin-thailand-mental-health-retreat.webp",
    alt: "The Cabin Thailand landing page with the headline 'Depression and Mental Health Retreat in Thailand' over a garden villa",
    link: "https://thecabinmentalhealth.vercel.app",
  },
  {
    key: "mental-health-thailand",
    cat: "Healthcare · Information Hub",
    title: "Mental Health Thailand",
    fullTitle: "Mental Health in Thailand: Conditions, Treatment & Support Guide",
    desc: "Information hub bringing together clear, easy-to-understand guidance on mental health conditions, treatment approaches, recovery, and professional support across Thailand.",
    tags: ["Website", "Healthcare", "Content Hub", "SEO"],
    img: "/work/mental-health-thailand-guide.webp",
    hero: "/work/mental-health-thailand-guide.webp",
    alt: "Mental Health in Thailand website hero with the headline 'Introduction to Mental Health in Thailand'",
    link: "https://mentalhealththailand.vercel.app",
  },
  {
    key: "unscramblex",
    cat: "Word Games · Web Tool",
    title: "UnscrambleX",
    fullTitle: "UnscrambleX: Free Word Unscrambler & Game Solvers",
    desc: "About page and product overview for a free word unscrambler powering a family of game-specific solvers. Drop in a rack of letters and get every valid word, ranked by score, with an interactive letter-tile demo.",
    tags: ["Website", "Web Tool", "Word Games", "SEO"],
    img: "/work/unscramblex-word-unscrambler.webp",
    hero: "/work/unscramblex-word-unscrambler.webp",
    alt: "UnscrambleX about page with the headline 'Every valid word your letters can form' and an interactive letter tile demo",
    link: "https://unscramblex-about-page.vercel.app",
  },
  {
    key: "wordsprint",
    cat: "Word Games · Daily Challenge",
    title: "WordSprint",
    fullTitle: "WordSprint: Daily & Weekly Word Game Challenges",
    desc: "Landing page for a daily and weekly word game where players solve the puzzle in six tries while tracking streak, score, and XP. The game is playable right on the page with no sign-up.",
    tags: ["Website", "Web Game", "Word Games", "Gamification"],
    img: "/work/wordsprint-daily-word-game.webp",
    hero: "/work/wordsprint-daily-word-game.webp",
    alt: "WordSprint landing page with the headline 'You're already playing' and streak, score, and XP counters on a dark blue background",
    link: "https://wordle-answer-three.vercel.app",
  },
  {
    key: "wordarcade",
    cat: "Word Games · Puzzle Platform",
    title: "WordArcade",
    fullTitle: "WordArcade: Your Daily Word Challenge",
    desc: "Daily five-letter word puzzle hub with a streak and XP system, mini games, and achievements. A new puzzle drops every midnight.",
    tags: ["Website", "Web Game", "Word Games", "Gamification"],
    img: "/work/wordarcade-daily-word-challenge.webp",
    hero: "/work/wordarcade-daily-word-challenge.webp",
    alt: "WordArcade landing page with the headline 'Can you crack today's word before the board runs out?' over a green letter-tile background",
    link: "https://nyt-crossword-six.vercel.app",
  },
  {
    key: "five-letter-words",
    cat: "Word Games · Web Tool",
    title: "5 Letter Words Finder",
    fullTitle: "5 Letter Words Finder: Free Instant Word Finder",
    desc: "Free instant word finder that returns real five-letter matches as you type known letters by position, with filters, a searchable word list, and a set of word games to play.",
    tags: ["Website", "Web Tool", "Word Games", "SEO"],
    img: "/work/five-letter-words-finder.webp",
    hero: "/work/five-letter-words-finder.webp",
    alt: "5 Letter Words Finder landing page with the headline '5 Letter Words Finder' and a letter-by-position search tool",
    link: "https://five-letter-words.vercel.app",
  },
  {
    key: "the-cabin-amsterdam",
    cat: "Healthcare · Addiction Treatment",
    title: "The Cabin Amsterdam",
    fullTitle: "The Cabin: Amsterdam Revalidatie Behandelcentrum",
    desc: "Dutch-language landing page for an Amsterdam rehabilitation treatment centre, presenting treatment programmes, locations and costs, and practical information, with an enquiry form and direct contact options above the fold.",
    tags: ["Website", "Healthcare", "Landing Page", "Lead Generation"],
    img: "/work/the-cabin-amsterdam-rehab.webp",
    hero: "/work/the-cabin-amsterdam-rehab.webp",
    alt: "The Cabin Amsterdam landing page with the headline 'Amsterdam Revalidatie Behandelcentrum' over an Amsterdam canal, with an enquiry form",
    link: "https://thecabin-rehab-amsterdam.vercel.app",
  },
  {
    key: "ufabox",
    cat: "Sports · Muay Thai Platform",
    title: "UfaBox",
    fullTitle: "UfaBox: Muay Thai Live Odds & Fight Betting Landing Page",
    desc: "High-contrast landing page for a Muay Thai betting brand, featuring live odds across Lumpinee title fights and stadium bouts, a fight schedule, promotions, and a betting guide, built around a bold ringside look.",
    tags: ["Website", "Landing Page", "Sports", "Branding"],
    img: "/work/ufabox-muay-thai-betting.webp",
    hero: "/work/ufabox-muay-thai-betting.webp",
    alt: "UfaBox landing page with the brand logo over a dark boxing ring with the headline 'Bet on the ring's most brutal art'",
    link: "https://muaythai-page.vercel.app",
  },
  {
    key: "anaphylaxis-health",
    cat: "Healthcare · Clinical Reference",
    title: "Anaphylaxis Health",
    fullTitle: "Anaphylaxis: Definition, Symptoms, and Treatment Reference",
    desc: "Clinical reference site covering anaphylaxis triggers, symptoms, shock, treatment, and prevention, with an at-a-glance fact panel, an emergency banner, and an emergency action plan.",
    tags: ["Website", "Healthcare", "Content Hub", "Education"],
    img: "/work/anaphylaxis-health-reference.webp",
    hero: "/work/anaphylaxis-health-reference.webp",
    alt: "Anaphylaxis Health reference site with the headline 'Anaphylaxis: definition, symptoms, and treatment' and an at-a-glance fact panel",
    link: "https://anaphylaxishealth.netlify.app",
  },
];

// Same pill ghost button used for "See Our Work" in Hero
const showMoreBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center",
  padding: "14px 28px", borderRadius: 9999, border: "none",
  fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em",
  lineHeight: 1, whiteSpace: "nowrap", cursor: "pointer",
  background: "rgba(26,25,22,0.07)", color: "var(--ink-2)",
  transition: "opacity 180ms, box-shadow 250ms",
};

export default function Work() {
  const [active, setActive] = useState<typeof projects[0] | null>(null);
  const { ref: headRef, displayed, done } = useTyping(HEADING, 42);
  const subRef = useWordFade(SUBTITLE, 40);
  const sectionRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    const collapsing = showAll;
    setShowAll(!showAll);
    if (collapsing) {
      // The grid gets shorter, so bring the button back into view instead of leaving the page mid-list
      requestAnimationFrame(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        toggleRef.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      });
    }
  };

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".work-reveal:not(.in)");
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
  }, [showAll]);

  const openProject = (p: typeof projects[0]) => {
    setActive(p);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section ref={sectionRef} id="work" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
        <div className="container">

          {/* Header */}
          <div style={{ marginBottom: 56 }}>
            <h2
              ref={headRef as React.RefObject<HTMLHeadingElement>}
              className={!done ? "typing-cursor" : ""}
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em", marginTop: 14, marginBottom: 14, color: "var(--ink)" }}
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

          {/* Cards — Poetic: wide 16/10 landscape image + thin 56px metadata strip */}
          <div id="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(6px, 0.6vw, 12px)" }} className={`work-grid${showAll ? " work-grid-all" : ""}`}>
            {projects.map((p, i) => (
              <div
                key={p.key}
                className={`work-reveal reveal delay-${i + 1}`}
                onClick={() => openProject(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(p); } }}
                style={{ border: "0.9px solid var(--border)", borderRadius: 2, overflow: "hidden", background: "var(--cream)", cursor: "pointer", transition: "box-shadow 280ms var(--ease), transform 280ms var(--ease)", boxShadow: "0 1px 4px rgba(26,25,22,0.04)", position: "relative" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 48px rgba(26,25,22,0.10)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 1px 4px rgba(26,25,22,0.04)"; el.style.transform = "none"; }}
              >
                {/* Image: Poetic uses 16/10 landscape — wider than tall, cinematic */}
                <div style={{ width: "100%", aspectRatio: "16 / 10", overflow: "hidden", position: "relative" }}>
                  <img
                    src={p.img} alt={p.alt ?? `${p.title} website screenshot`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 600ms var(--ease)", display: "block" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                  />
                </div>
                {/* Metadata strip — Poetic keeps this very compact, ~56px tall */}
                <div style={{ height: 56, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "0.9px solid var(--border)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-2)", marginBottom: 1, letterSpacing: "0.01em" }}>{p.cat}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 2, border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12, background: "var(--bg)", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <button ref={toggleRef} type="button" onClick={toggleShowAll} aria-expanded={showAll} aria-controls="work-grid" style={showMoreBtn}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .work-grid { grid-template-columns: 1fr 1fr !important; } }
          @media(max-width:540px){ .work-grid { grid-template-columns: 1fr !important; } }
          /* Collapsed: show the first 6 rows (18 / 12 / 6 cards at 3 / 2 / 1 columns) */
          .work-grid:not(.work-grid-all) > :nth-child(n+19) { display: none; }
          @media(max-width:900px){ .work-grid:not(.work-grid-all) > :nth-child(n+13) { display: none; } }
          @media(max-width:540px){ .work-grid:not(.work-grid-all) > :nth-child(n+7) { display: none; } }
        `}</style>
      </section>

      {/* Overlay */}
      <div
        className={`work-overlay fixed inset-0 z-[200] flex items-end ${active ? "open" : ""}`}
        aria-hidden={!active}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,25,22,0.4)", backdropFilter: "blur(8px)" }} onClick={close} />
        <div className="work-panel no-scrollbar relative z-10 w-full overflow-y-auto" style={{ maxHeight: "90vh", background: "var(--bg)", borderRadius: "2px 2px 0 0" }}>
          {active && (
            <>
              <button onClick={close} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: 2, background: "rgba(253,253,252,0.9)", border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <img src={active.hero} alt={active.alt ?? active.fullTitle}style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "32px 40px 60px", maxWidth: 800, margin: "0 auto" }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 }}>{active.cat}</div>
                <h2 style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16, color: "var(--ink)" }}>{active.fullTitle}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginBottom: 28, letterSpacing: "-0.01em" }}>{active.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                  {active.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 2, border: "0.9px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
                <a href={active.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)", borderBottom: "0.9px solid var(--border)", paddingBottom: 3, textDecoration: "none" }}>
                  View Live Project
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
