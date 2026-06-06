// Small, shared UI primitives styled to the Everhope design tokens (see DESIGN_NOTES.md).
import { CATEGORIES } from "../data/catalog.js";

// ---- Button --------------------------------------------------------------------------
const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-dark border border-transparent",
  outline: "bg-white text-brand border border-brand hover:bg-brand/5",
  teal: "bg-teal text-white hover:opacity-90 border border-transparent",
  safe: "bg-safe text-white hover:opacity-90 border border-transparent",
  ghost: "bg-transparent text-ink border border-hair hover:bg-cream",
  quiet: "bg-transparent text-brand border border-transparent hover:underline",
};
const SIZES = {
  sm: "text-[13px] px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-[15px] px-5 py-3 gap-2",
};

export function btnClass({ variant = "primary", size = "md", full = false } = {}) {
  return [
    "inline-flex items-center justify-center font-semibold rounded-xl transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANTS[variant],
    SIZES[size],
    full ? "w-full" : "",
  ].join(" ");
}

export function Button({ variant, size, full, className = "", ...props }) {
  return <button className={`${btnClass({ variant, size, full })} ${className}`} {...props} />;
}

// ---- Badge / pill --------------------------------------------------------------------
export function Badge({ tone = "neutral", className = "", children }) {
  const tones = {
    neutral: "bg-cream text-ink-muted border-hair",
    safe: "bg-safe-tint text-safe border-safe/30",
    warn: "bg-warn-tint text-warn border-warn/30",
    brand: "bg-brand/10 text-brand border-brand/20",
    teal: "bg-teal-tint text-teal border-teal/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

// ---- Stars ---------------------------------------------------------------------------
export function Stars({ rating, reviews, size = "sm" }) {
  const px = size === "sm" ? 14 : 16;
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-muted">
      <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.min(1, Math.max(0, rating - i))} px={px} />
        ))}
      </span>
      <span className="text-[13px] font-semibold text-ink">{rating.toFixed(1)}</span>
      {reviews != null && <span className="text-[12px]">({reviews})</span>}
    </span>
  );
}
function Star({ fill, px }) {
  const id = `g${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={px} height={px} viewBox="0 0 20 20" className="-mr-px">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="var(--color-star)" />
          <stop offset={`${fill * 100}%`} stopColor="#E2D9D5" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.95 2.6.94-5.5-4-3.9 5.53-.8z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

// ---- Product art (SVG placeholder, no external images) -------------------------------
export function ProductArt({ product, className = "", rounded = "rounded-xl" }) {
  const cat = CATEGORIES[product.category];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: cat.tint }}
      aria-hidden="true"
    >
      {/* soft capsule motif */}
      <svg viewBox="0 0 120 120" className="absolute opacity-25" width="78%" height="78%">
        <g transform="rotate(45 60 60)">
          <rect x="38" y="20" width="44" height="80" rx="22" fill="none" stroke={cat.ink} strokeWidth="3" />
          <line x1="38" y1="60" x2="82" y2="60" stroke={cat.ink} strokeWidth="3" />
        </g>
      </svg>
      <span className="relative text-2xl font-extrabold tracking-tight" style={{ color: cat.ink }}>
        {product.image.initials}
      </span>
      <span
        className="eyebrow absolute bottom-2 left-0 right-0 text-center text-[10px]"
        style={{ color: cat.ink }}
      >
        Everhope
      </span>
    </div>
  );
}

// ---- Price row -----------------------------------------------------------------------
export function Price({ price, mrp, pct, size = "md" }) {
  const big = size === "lg";
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-bold text-ink ${big ? "text-2xl" : "text-base"}`}>
        ₹{price.toLocaleString("en-IN")}
      </span>
      {mrp > price && (
        <>
          <span className={`text-ink-muted line-through ${big ? "text-base" : "text-[13px]"}`}>
            ₹{mrp.toLocaleString("en-IN")}
          </span>
          {pct > 0 && <span className="text-[13px] font-semibold text-safe">{pct}% Off</span>}
        </>
      )}
    </div>
  );
}

// ---- Certifications row --------------------------------------------------------------
export function CertRow({ certs, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      {certs.map((c) => (
        <span
          key={c}
          className="eyebrow inline-flex items-center gap-1 text-ink-muted"
          title={`${c} certified`}
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1.5l2.2 1.6 2.7-.2.9 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.9 2.6-2.7-.2L10 18.5l-2.2-1.6-2.7.2-.9-2.6L2 12.9l.9-2.6L2 7.7l2.2-1.6.9-2.6 2.7.2z"
              fill="var(--color-teal-tint)"
              stroke="var(--color-teal)"
              strokeWidth="1"
            />
            <path d="M6.7 10.2l2.1 2.1 4.4-4.5" stroke="var(--color-teal)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {c}
        </span>
      ))}
    </div>
  );
}

// ---- Section heading -----------------------------------------------------------------
export function SectionTitle({ eyebrow, title, sub, className = "" }) {
  return (
    <div className={className}>
      {eyebrow && <div className="eyebrow text-brand mb-1">{eyebrow}</div>}
      <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
      {sub && <p className="mt-1 text-ink-muted">{sub}</p>}
    </div>
  );
}
