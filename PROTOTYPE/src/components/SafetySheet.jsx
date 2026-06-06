import { useStore } from "../state/StoreContext.jsx";
import { Button, CertRow } from "./ui.jsx";
import { formatRupees } from "../data/catalog.js";

// FEATURE B — "verify outward".
// A clean, printable clinical safety sheet for one product, plus mocked share actions and
// the async sign-off state that unlocks checkout. Everything is front-end only.
export default function SafetySheet({ product, open, onClose }) {
  const { sendSheet, simulateApproval, approvalOf, addToCart, cart, showToast } = useStore();
  if (!open || !product) return null;

  const status = approvalOf(product.id); // none | pending | approved
  const ref = `EH-${product.id.slice(0, 6).toUpperCase()}-2606`;
  const shareUrl = `https://share.everhope.care/sheet/${ref}`;
  const inCart = cart.some((l) => l.id === product.id);

  const ensureCart = () => {
    if (!inCart) addToCart(product.id);
  };

  const onWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Doctor, please review this supplement before I start it: ${product.name}. Clinical safety sheet: ${shareUrl}`,
    );
    try {
      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
    } catch {
      /* popups may be blocked — the toast still confirms the mocked action */
    }
    showToast("Opening WhatsApp with the safety sheet (mocked)", "teal");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      /* clipboard may be unavailable in this context — mock still succeeds */
    }
    showToast("Share link copied", "brand");
  };

  const onPrint = () => {
    showToast("Use your browser's “Save as PDF” in the print dialog", "neutral");
    setTimeout(() => window.print(), 350);
  };

  const onSend = () => {
    ensureCart();
    sendSheet(product.id);
    showToast("Sheet sent to your doctor · cart saved", "teal");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-0 sm:p-6">
      <button aria-label="Close" className="no-print fixed inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative my-0 sm:my-4 w-full sm:max-w-2xl">
        {/* ACTION BAR (not printed) */}
        <div className="no-print sticky top-0 z-10 flex flex-wrap items-center gap-2 rounded-t-2xl border-b border-hair bg-white px-4 py-3 shadow-sm">
          <div className="mr-auto">
            <div className="text-[13px] font-bold leading-tight">Review with your doctor</div>
            <div className="text-[12px] text-ink-muted">Share this sheet, then check out once they approve</div>
          </div>
          <Button variant="ghost" size="sm" onClick={onWhatsApp}>
            <WaIcon /> WhatsApp
          </Button>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <LinkIcon /> Copy link
          </Button>
          <Button variant="ghost" size="sm" onClick={onPrint}>
            <PdfIcon /> Download PDF
          </Button>
          <button onClick={onClose} className="ml-1 grid h-8 w-8 place-items-center rounded-lg text-ink-muted hover:bg-cream">
            ✕
          </button>
        </div>

        {/* THE SHEET (this is what prints) */}
        <article className="print-sheet bg-white px-6 py-7 sm:px-9 sm:py-9 shadow-xl">
          {/* letterhead */}
          <header className="flex items-start justify-between gap-4 border-b-2 border-teal pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white font-extrabold">e</span>
                <span className="text-lg font-extrabold tracking-tight">everhope oncology</span>
              </div>
              <div className="mt-1 text-[15px] font-bold text-teal">Clinical Safety Sheet</div>
              <div className="text-[12px] text-ink-muted">Prepared for review by your treating oncologist</div>
            </div>
            <div className="text-right text-[11.5px] text-ink-muted">
              <div>
                Ref: <span className="font-semibold text-ink">{ref}</span>
              </div>
              <div>Prepared: 6 Jun 2026</div>
              <div>Patient: you</div>
            </div>
          </header>

          {/* product summary */}
          <section className="mt-5">
            <h1 className="text-xl font-bold leading-tight">{product.name}</h1>
            <div className="mt-1 text-[13px] text-ink-muted">
              {product.brand} · {formatRupees(product.price)} · Adjunctive nutritional supplement
            </div>
            <p className="mt-2 text-[13.5px] text-ink">{product.description}</p>
          </section>

          {/* two-column clinical body */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Block title="Full ingredients">
              <ul className="list-disc pl-4 space-y-0.5">
                {product.ingredients.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Block>

            <Block title="Allergens">
              {product.allergens.length ? (
                <p>
                  Contains: <strong>{product.allergens.join(", ")}</strong>.
                </p>
              ) : (
                <p>No major declared allergens. {tagLine(product)}</p>
              )}
              <p className="mt-1 text-ink-muted">{product.safety_and_tolerance.allergies}</p>
            </Block>

            <Block title="Suggested use">
              <p>{product.suggested_use}</p>
            </Block>

            <Block title="Things to be aware of">
              <p>{product.safety_and_tolerance.aware}</p>
            </Block>
          </div>

          {/* interaction notes — the part the oncologist actually scans */}
          <section className="mt-5 rounded-xl border border-teal/30 bg-teal-tint/60 p-4">
            <div className="eyebrow text-teal mb-1">For the oncologist — interaction notes</div>
            <ul className="list-disc pl-4 space-y-1 text-[13px]">
              {product.interaction_notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <div className="mt-3">
              <div className="text-[12px] font-semibold text-ink">Avoid / use with caution if:</div>
              <p className="text-[13px] text-ink">{product.avoid_if.join(" · ")}</p>
            </div>
            <p className="mt-2 text-[12px] text-ink-muted">
              {product.safety_and_tolerance.consider}
            </p>
          </section>

          {/* sign-off */}
          <section className="mt-5 rounded-xl border border-hair p-4">
            <div className="eyebrow text-ink-muted mb-2">Oncologist sign-off</div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
              <label className="inline-flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-sm border border-ink" /> Approved as-is
              </label>
              <label className="inline-flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-sm border border-ink" /> Approved with changes
              </label>
              <label className="inline-flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-sm border border-ink" /> Not recommended now
              </label>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-[12px] text-ink-muted">
              <div className="border-t border-ink/40 pt-1">Signature</div>
              <div className="border-t border-ink/40 pt-1">Name · Date</div>
            </div>
          </section>

          <CertRow certs={product.certifications} className="mt-5" />
          <p className="mt-4 border-t border-hair pt-3 text-[11px] leading-relaxed text-ink-muted">
            This sheet is an information aid to support a conversation with your oncologist. It is not a
            prescription or medical advice and does not replace your care team's judgement. {product.name} is
            an adjunctive nutritional supplement, not a prescription drug.
          </p>
        </article>

        {/* APPROVAL / UNLOCK PANEL (not printed) */}
        <div className="no-print rounded-b-2xl border-t border-hair bg-white px-4 py-4 shadow-sm">
          {status === "none" && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-auto text-[13px] text-ink-muted">
                Send this to your doctor. We'll save your cart and unlock checkout when they approve.
              </p>
              <Button variant="teal" onClick={onSend}>
                Send to doctor & save cart
              </Button>
            </div>
          )}

          {status === "pending" && (
            <div className="rounded-xl bg-teal-tint px-4 py-3">
              <div className="flex items-center gap-2 font-semibold text-teal">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal" /> Sheet sent · awaiting approval
              </div>
              <p className="mt-1 text-[13px] text-ink">
                <strong>Reply “APPROVED” to unlock checkout.</strong> Your cart is saved.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button variant="safe" size="sm" onClick={() => { simulateApproval(product.id); showToast("Doctor replied APPROVED — checkout unlocked", "safe"); }}>
                  ▶︎ Simulate doctor reply: APPROVED
                </Button>
                <span className="text-[12px] text-ink-muted">(demo only — mocks the inbound reply)</span>
              </div>
            </div>
          )}

          {status === "approved" && (
            <div className="flex flex-wrap items-center gap-3 rounded-xl bg-safe-tint px-4 py-3">
              <span className="font-semibold text-safe">✓ Approved by your doctor — checkout unlocked</span>
              <Button variant="safe" size="sm" className="ml-auto" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="text-[13px]">
      <div className="eyebrow text-ink-muted mb-1">{title}</div>
      <div className="text-ink leading-relaxed">{children}</div>
    </div>
  );
}

function tagLine(product) {
  const free = product.tags.filter((t) => t.endsWith("-free")).map((t) => t.replace("-free", ""));
  return free.length ? `Free from ${free.join(", ")}.` : "";
}

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.8 12.2c-.2.3-.3.6-.2.9l.6 2.2-2.3-.6c-.3-.1-.6 0-.9.1A8 8 0 1 1 12 4zm-2.6 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.4 3.9 2.2.8 2.6.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.3-1.6-.3-.4-.6-.8-.9-1.2-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4z" />
  </svg>
);
const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PdfIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" strokeLinecap="round" />
  </svg>
);
