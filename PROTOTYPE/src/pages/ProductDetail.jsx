import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { getProduct, CATEGORIES, discountPct, formatRupees } from "../data/catalog.js";
import { ProductArt, Stars, Price, Badge, Button, CertRow } from "../components/ui.jsx";
import SafetySheet from "../components/SafetySheet.jsx";

const PACKS = [
  { n: 1, mult: 1, save: 0 },
  { n: 2, mult: 2, save: 0.09 },
  { n: 3, mult: 3, save: 0.11 },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { evaluate, filterActive, addToCart, approvalOf, openAvoidModal, showToast } = useStore();
  const [pack, setPack] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!product)
    return (
      <div className="mx-auto max-w-[800px] px-4 py-20 text-center">
        <p className="text-ink-muted">Product not found.</p>
        <Link to="/" className="font-semibold text-brand hover:underline">← Back to shop</Link>
      </div>
    );

  const cat = CATEGORIES[product.category];
  const ev = evaluate(product);
  const status = approvalOf(product.id);
  const packMeta = PACKS[pack];
  const packPrice = Math.round(product.price * packMeta.mult * (1 - packMeta.save));

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      {/* breadcrumb */}
      <nav className="mb-4 text-[13px] text-ink-muted">
        <Link to="/" className="hover:text-brand">Shop</Link> <span className="px-1">/</span>
        <span style={{ color: cat.ink }}>{cat.label}</span> <span className="px-1">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* LEFT: media + sections */}
        <div>
          <ProductArt product={product} className="aspect-square w-full max-w-[460px]" />

          {/* DESCRIPTION */}
          <Section title="Description">
            <p>{product.description}</p>
          </Section>

          {/* SAFETY & TOLERANCE — three sub-blocks, mirroring the live PDP */}
          <Section title="Safety & Tolerance">
            <SubBlock label="What to be aware of">{product.safety_and_tolerance.aware}</SubBlock>
            <SubBlock label="If you have known allergies">{product.safety_and_tolerance.allergies}</SubBlock>
            <SubBlock label="Things to consider before use">{product.safety_and_tolerance.consider}</SubBlock>
            <div className="mt-3 rounded-lg bg-cream px-3 py-2 text-[13px]">
              <span className="font-semibold text-ink">Avoid if:</span>{" "}
              <span className="text-ink-muted">{product.avoid_if.join(" | ")}</span>
            </div>
          </Section>

          {/* INGREDIENTS */}
          <Section title="Ingredients">
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {product.ingredients.map((i) => (
                <li key={i} className="flex items-start gap-2 text-[14px]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cat.ink }} />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-ink-muted">
              Allergens:{" "}
              {product.allergens.length ? (
                <strong className="text-ink">{product.allergens.join(", ")}</strong>
              ) : (
                "none declared"
              )}
              .
            </p>
          </Section>

          {/* SUGGESTED USE */}
          <Section title="Suggested Use">
            <p>{product.suggested_use}</p>
          </Section>

          {/* FAQ */}
          <Section title="Frequently Asked Questions">
            <Faq q="Can I take this during chemotherapy?">
              That depends on your specific treatment. Use “Review with your doctor” to send a clinical
              safety sheet to your oncologist and get it cleared before you start.
            </Faq>
            <Faq q="Is this a prescription drug?">
              No. This is an adjunctive nutritional supplement. It supports your care; it does not replace
              your oncologist's advice.
            </Faq>
          </Section>

          {/* REVIEWS */}
          <Section title="Reviews & Rating">
            <div className="flex items-center gap-3">
              <Stars rating={product.rating} reviews={product.reviews} size="md" />
              <span className="text-[13px] text-ink-muted">Verified patients & caregivers</span>
            </div>
          </Section>
        </div>

        {/* RIGHT: buy box */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-hair p-5">
            <div className="eyebrow" style={{ color: cat.ink }}>{cat.label}</div>
            <h1 className="mt-1 text-2xl font-bold leading-tight">{product.name}</h1>
            <div className="mt-2"><Stars rating={product.rating} reviews={product.reviews} /></div>

            {/* avoid-list verdict */}
            {filterActive && (
              <div
                className={`mt-4 rounded-xl border p-3 ${
                  ev.status === "cleared" ? "border-safe/30 bg-safe-tint" : "border-warn/30 bg-warn-tint"
                }`}
              >
                {ev.status === "cleared" ? (
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-safe">
                    <Shield /> Cleared against your avoid-list
                  </div>
                ) : (
                  <div className="text-[13px]">
                    <div className="flex items-center gap-2 font-semibold text-warn">
                      <Warn /> Flagged by your avoid-list
                    </div>
                    <ul className="mt-1 list-disc pl-5 text-warn">
                      {ev.matches.map((m) => (
                        <li key={m.key}>
                          <strong>{m.label}</strong> — {m.reason} <span className="text-ink-muted">(found: {m.matchedOn})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* price + packs */}
            <div className="mt-4">
              <Price price={packPrice} mrp={Math.round(product.mrp * packMeta.mult)} pct={discountPct(packPrice, Math.round(product.mrp * packMeta.mult))} size="lg" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PACKS.map((p, i) => (
                  <button
                    key={p.n}
                    onClick={() => setPack(i)}
                    className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                      pack === i ? "border-brand bg-brand/5" : "border-hair hover:bg-cream"
                    }`}
                  >
                    <div className="text-[13px] font-semibold">Pack of {p.n}</div>
                    <div className="text-[11px] text-ink-muted">
                      {p.save ? `Save ${Math.round(p.save * 100)}%` : "—"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PRIMARY: Feature B */}
            <button
              onClick={() => setSheetOpen(true)}
              className="mt-5 w-full rounded-xl bg-teal px-4 py-3.5 text-[15px] font-semibold text-white hover:opacity-90"
            >
              🩺 Review with your doctor
            </button>
            <p className="mt-1.5 text-center text-[12px] text-ink-muted">
              Generate a clinical safety sheet to share & get sign-off
            </p>

            {/* approval state */}
            {status === "pending" && (
              <div className="mt-3 rounded-lg bg-teal-tint px-3 py-2 text-[12.5px] font-medium text-teal">
                Sheet sent · reply “APPROVED” to unlock checkout
              </div>
            )}
            {status === "approved" && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-safe-tint px-3 py-2 text-[12.5px] font-semibold text-safe">
                ✓ Approved by your doctor
                <Link to="/cart" className="underline">Go to cart</Link>
              </div>
            )}

            {/* secondary cart actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => { addToCart(product.id); showToast(`Added to cart`, "brand"); }}
                disabled={ev.status === "filtered"}
              >
                Add to cart
              </Button>
              <Link
                to="/cart"
                onClick={() => addToCart(product.id)}
                className={ev.status === "filtered" ? "pointer-events-none" : ""}
              >
                <Button full disabled={ev.status === "filtered"}>Buy now</Button>
              </Link>
            </div>
            {ev.status === "filtered" && (
              <button onClick={openAvoidModal} className="mt-2 w-full text-center text-[12px] font-semibold text-brand hover:underline">
                This isn't safe for your list — edit your avoid-list
              </button>
            )}

            <CertRow certs={product.certifications} className="mt-5 justify-center" />
          </div>
        </aside>
      </div>

      <SafetySheet product={product} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-7 border-t border-hair pt-6">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="mt-2.5 text-[14.5px] leading-relaxed text-ink">{children}</div>
    </section>
  );
}
function SubBlock({ label, children }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="text-[13px] font-semibold text-ink">{label}</div>
      <p className="text-ink-muted">{children}</p>
    </div>
  );
}
function Faq({ q, children }) {
  return (
    <details className="group border-b border-hair py-3 last:border-0">
      <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink list-none">
        {q}
        <span className="text-ink-muted transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-2 text-ink-muted">{children}</p>
    </details>
  );
}
const Shield = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Warn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l9 16H3z" strokeLinejoin="round" />
    <path d="M12 9v5M12 17h.01" strokeLinecap="round" />
  </svg>
);
