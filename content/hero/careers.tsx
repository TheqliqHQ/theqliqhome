export default function CareersHero({ chip }: { chip?: string }) {
  return (
    <div style={{ borderRadius: 28, background: "#fff", padding: "36px 40px" }}>
      <span style={{ display:"inline-block", padding:"6px 12px", borderRadius:9999, background:"var(--stage-bg)", color:"var(--stage-fg)", fontSize:12, fontWeight:700 }}>
        {chip}
      </span>
      <h2 style={{ marginTop: 12, fontSize: 40, lineHeight: "48px", fontWeight: 800, color: "#0f172a" }}>
        Join the crew
      </h2>
    </div>
  );
}
