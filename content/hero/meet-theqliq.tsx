export default function MeetTheqliqHero({ chip }: { chip?: string }) {
  return (
    <div
      style={{
        borderRadius: 28,
        background: "#fff",
        padding: "36px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: 24,
        alignItems: "center",
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 9999,
            background: "var(--stage-bg)",
            color: "var(--stage-fg)",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {chip}
        </span>
        <h2 style={{ marginTop: 12, fontSize: 40, lineHeight: "48px", fontWeight: 800, color: "#0f172a" }}>
          Meet Theqliq
        </h2>
      </div>
      <div style={{ width: "100%", height: 220, borderRadius: 20, background: `url(/hero/meet.png) center/cover no-repeat` }} />
    </div>
  );
}
