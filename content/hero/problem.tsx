// content/hero/problem.tsx
export default function ProblemHero() {
  return (
    <div className="hero-grid">
      {/* Left column = title */}
      <div className="hero-left">
        <h1 className="hero-title">
          Render heavy<br />graphics in the<br />browser
        </h1>
      </div>

      {/* Right column = image */}
      <div className="hero-right">
        {/* Next/Image is fine too; keep the CSS size the source of truth */}
        <img
          src="/public/hero/card1.png"
          alt="Illustration"
          className="hero-figure"
          loading="eager"
        />
      </div>
    </div>
  );
}
