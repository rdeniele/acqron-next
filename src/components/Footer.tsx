export default function Footer() {
  return (
    <footer style={{ borderTop: "0.9px solid var(--border)", padding: "52px 0 36px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 44, marginBottom: 48 }} className="foot-grid">
          <div>
            <a href="#home" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)", display: "block", marginBottom: 10, textDecoration: "none" }}>
              Acq<span style={{ color: "#F97316" }}>r</span>on
            </a>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--muted)", maxWidth: 240 }}>
              Acqron is a web design and development company in Bacolod City, Philippines. Custom websites and software built to last.
            </p>
          </div>
          {[
            { title: "Services", links: [["#services","Web Design & Development"],["#services","Workflow Automation"],["#services","Dashboards & Analytics"],["#services","Technical Consulting"],["#services","Team Training"]] },
            { title: "Company",  links: [["#about","About"],["#work","Work"],["#testimonials","Testimonials"],["#contact","Contact"]] },
            { title: "Contact",  links: [["mailto:info@acqron.com","info@acqron.com"],["#contact","Book a Call"],["#about","Bacolod City, Philippines"]] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted-2)", marginBottom: 14 }}>{col.title}</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href} style={{ fontSize: 13, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--muted)", textDecoration: "none" }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 24, borderTop: "0.9px solid var(--border)" }}>
          <p style={{ fontSize: 12, color: "var(--muted-2)" }}>© 2025 Acqron. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy","Terms"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "var(--muted-2)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .foot-grid{grid-template-columns:1fr 1fr!important;gap:32px!important} }
        @media(max-width:480px){ .foot-grid{grid-template-columns:1fr!important} }
      `}</style>
    </footer>
  );
}
