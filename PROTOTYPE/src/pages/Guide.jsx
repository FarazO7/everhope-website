import { Link } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { Button } from "../components/ui.jsx";

// A one-screen explainer of the bidirectional clearance story, so a reviewer can orient in
// seconds and then run the flow.
export default function Guide() {
  const { openAvoidModal } = useStore();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10">
      <div className="eyebrow text-brand mb-2">The core idea</div>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Bidirectional safety clearance — before the patient buys
      </h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        The biggest reason oncology patients abandon a supplement at checkout isn't price or trust
        badges — it's the unanswered question <em>“is this safe with my treatment?”</em> Everhope
        answers it from both directions.
      </p>

      {/* two directions */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Direction
          tone="brand"
          tag="Feature A · filter inward"
          title="Your oncologist's avoid-list filters the shop"
          points={[
            "Upload the allergy / avoid list (mock OCR).",
            "Confirm what we read — you stay in control.",
            "Unsafe products disappear; safe ones get a “Cleared for you” badge.",
            "When unsure, we exclude — safety over sales.",
          ]}
        />
        <Direction
          tone="teal"
          tag="Feature B · verify outward"
          title="A clinical safety sheet your doctor can sign off"
          points={[
            "Generate a printable sheet built for an oncologist.",
            "Share by WhatsApp, copy link, or save as PDF.",
            "Cart is saved; reply “APPROVED” unlocks checkout.",
            "Framed as a safety aid — never a medical claim.",
          ]}
        />
      </div>

      {/* the flow */}
      <h2 className="mt-10 text-xl font-bold">The flow, end to end</h2>
      <ol className="mt-4 space-y-3">
        {[
          ["Land on the catalogue", "Browse 7 oncology supplements across symptom categories.", "/"],
          ["Upload your avoid-list", "Mock-parse it and confirm the extracted allergies + avoid notes.", null],
          ["Catalogue filters itself", "Unsafe SKUs are hidden with a “filtered for your safety” count.", "/"],
          ["Open a cleared product", "See its safety & tolerance, ingredients and avoid-if notes.", null],
          ["Review with your doctor", "Generate & share the clinical safety sheet; cart is saved.", null],
          ["Approval unlocks checkout", "Reply “APPROVED”, then complete the mocked checkout.", "/cart"],
        ].map(([t, d, to], i) => (
          <li key={t} className="flex gap-4 rounded-xl border border-hair p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-white font-bold">
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="font-semibold text-ink">{t}</div>
              <div className="text-[13.5px] text-ink-muted">{d}</div>
            </div>
            {to && (
              <Link to={to} className="self-center text-[13px] font-semibold text-brand hover:underline whitespace-nowrap">
                Go →
              </Link>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={openAvoidModal}>Start the demo — upload an avoid-list</Button>
        <Link to="/"><Button variant="ghost" size="lg">Browse the catalogue</Button></Link>
      </div>
    </div>
  );
}

function Direction({ tone, tag, title, points }) {
  const ring = tone === "brand" ? "border-brand/30 bg-brand/[0.03]" : "border-teal/30 bg-teal-tint/40";
  const chip = tone === "brand" ? "text-brand" : "text-teal";
  return (
    <div className={`rounded-2xl border p-5 ${ring}`}>
      <div className={`eyebrow ${chip} mb-1`}>{tag}</div>
      <div className="font-bold text-ink">{title}</div>
      <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className={chip}>✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
