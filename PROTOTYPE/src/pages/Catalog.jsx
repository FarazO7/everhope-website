import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { PRODUCTS, CATEGORIES } from "../data/catalog.js";
import { tokensByLayer } from "../data/avoidList.js";
import ProductCard from "../components/ProductCard.jsx";
import { Button, Badge } from "../components/ui.jsx";

export default function Catalog() {
  const { filterActive, activeKeys, evaluate, openAvoidModal, clearAvoidList, appliedList } = useStore();
  const [cat, setCat] = useState("all");
  const [revealFiltered, setRevealFiltered] = useState(false);

  const visible = useMemo(
    () => (cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat],
  );

  const clearedCount = visible.filter((p) => evaluate(p).status === "cleared").length;
  const filteredCount = visible.length - clearedCount;
  const layers = tokensByLayer(activeKeys);

  return (
    <div>
      {/* HERO */}
      <section className="bg-cream border-b border-hair">
        <div className="mx-auto max-w-[1200px] px-4 py-10 md:py-14 grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="eyebrow text-brand mb-2">Curated for cancer care · Reviewed by experts</div>
            <h1 className="text-3xl md:text-[42px] font-extrabold leading-[1.08] tracking-tight">
              Buy the supplements that are{" "}
              <span className="text-brand">safe for your treatment</span> — not just any supplement.
            </h1>
            <p className="mt-4 max-w-xl text-ink-muted">
              Most patients self-supplement without telling their oncologist. Everhope closes that
              gap both ways: <strong className="text-ink">filter inward</strong> against your
              doctor's avoid-list, and <strong className="text-ink">verify outward</strong> with a
              clinical safety sheet they can sign off — before you check out.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={openAvoidModal}>
                <UploadIcon /> Upload your oncologist's avoid-list
              </Button>
              <Link to="/guide" className="inline-flex items-center font-semibold text-brand hover:underline px-1">
                See how the flow works →
              </Link>
            </div>
          </div>

          {/* trust panel */}
          <div className="rounded-2xl border border-hair bg-white p-5 shadow-sm">
            <div className="eyebrow text-ink-muted mb-3">Why patients trust Everhope</div>
            <ul className="space-y-2.5 text-sm">
              {[
                ["🩺", "Oncology nutritionist reviewed"],
                ["🧪", "Third-party tested · GMP · HACCP · FSSAI"],
                ["🛡️", "Cleared against your treatment, not generic advice"],
                ["👥", "1 Lakh+ patients supported"],
              ].map(([icon, t]) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-cream">{icon}</span>
                  <span className="font-medium text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* APPLIED AVOID-LIST BANNER */}
        {filterActive && (
          <div className="mb-6 rounded-2xl border border-safe/30 bg-safe-tint/60 p-4 md:p-5">
            <div className="flex flex-wrap items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-safe text-white">
                <ShieldIcon />
              </div>
              <div className="flex-1 min-w-[220px]">
                <div className="font-bold text-ink">
                  Showing {clearedCount} cleared {clearedCount === 1 ? "product" : "products"} ·{" "}
                  <span className="text-warn">{filteredCount} filtered for your safety</span>
                </div>
                <p className="text-[13px] text-ink-muted">
                  Applied from <span className="font-medium text-ink">{appliedList?.fileName}</span>.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {layers.allergens.map((t) => (
                    <Badge key={t.key} tone="warn">
                      {t.label}
                    </Badge>
                  ))}
                  {layers.avoid.map((t) => (
                    <Badge key={t.key} tone="teal">
                      {t.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {filteredCount > 0 && (
                  <button
                    onClick={() => setRevealFiltered((v) => !v)}
                    className="rounded-lg border border-hair bg-white px-3 py-1.5 text-[13px] font-semibold text-ink hover:bg-cream"
                  >
                    {revealFiltered ? "Hide filtered" : `Show ${filteredCount} filtered`}
                  </button>
                )}
                <div className="flex gap-2">
                  <button onClick={openAvoidModal} className="text-[13px] font-semibold text-brand hover:underline">
                    Edit
                  </button>
                  <span className="text-hair">·</span>
                  <button onClick={clearAvoidList} className="text-[13px] font-semibold text-ink-muted hover:text-warn">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY CHIPS */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>
            All products
          </Chip>
          {Object.entries(CATEGORIES).map(([key, c]) => (
            <Chip key={key} active={cat === key} onClick={() => setCat(key)}>
              {c.label}
            </Chip>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} revealFiltered={revealFiltered} />
          ))}
        </div>

        {/* empty state when everything is filtered and not revealed */}
        {filterActive && clearedCount === 0 && !revealFiltered && (
          <div className="rounded-xl border border-dashed border-hair p-10 text-center text-ink-muted">
            Nothing in this category clears your current avoid-list.{" "}
            <button onClick={() => setRevealFiltered(true)} className="font-semibold text-brand hover:underline">
              See what was filtered
            </button>
          </div>
        )}

        {!filterActive && (
          <p className="mt-6 text-center text-[13px] text-ink-muted">
            Tip: upload your oncologist's avoid-list to see only the products that are safe for{" "}
            <em>your</em> treatment.
          </p>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
        active ? "border-brand bg-brand text-white" : "border-hair bg-white text-ink hover:bg-cream"
      }`}
    >
      {children}
    </button>
  );
}

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 16V4M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" strokeLinecap="round" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
