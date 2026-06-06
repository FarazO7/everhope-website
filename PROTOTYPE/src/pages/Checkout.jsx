import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { formatRupees } from "../data/catalog.js";
import { Button, Badge } from "../components/ui.jsx";

export default function Checkout() {
  const { cartLines, cartTotal, cartApproved, clearCart } = useStore();
  const [placed, setPlaced] = useState(false);

  // Hard gate: you cannot reach a real checkout until every item is doctor-approved.
  if (!placed && (cartLines.length === 0 || !cartApproved)) {
    return <Navigate to="/cart" replace />;
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-[600px] px-4 py-20 text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-safe-tint text-3xl text-safe">✓</div>
        <h1 className="text-2xl font-bold">Order placed (mock)</h1>
        <p className="mt-2 text-ink-muted">
          Every item was cleared against your avoid-list and signed off by your oncologist before
          purchase. That's the whole point — <strong className="text-ink">safe, then sold.</strong>
        </p>
        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 text-sm">
          Order <strong>#EH-{Math.floor(100000 + Math.random() * 900000)}</strong>
        </div>
        <div className="mt-6">
          <Link to="/"><Button>Back to shop</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <Badge tone="safe" className="mt-2">✓ All items cleared by your doctor</Badge>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* mock form */}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setPlaced(true); clearCart(); }}>
          <Fieldset legend="Contact">
            <Field label="Full name" placeholder="Priya Sharma" />
            <Field label="Phone" placeholder="+91 ●●●●● ●●●●●" />
          </Fieldset>
          <Fieldset legend="Delivery address">
            <Field label="Address" placeholder="Flat / House, Street" full />
            <Field label="City" placeholder="Bengaluru" />
            <Field label="PIN code" placeholder="560001" />
          </Fieldset>
          <Fieldset legend="Payment (mocked)">
            <Field label="Card number" placeholder="4242 4242 4242 4242" full />
            <Field label="Expiry" placeholder="MM/YY" />
            <Field label="CVV" placeholder="●●●" />
          </Fieldset>
          <Button type="submit" size="lg" full>Place order · {formatRupees(cartTotal)} (mock)</Button>
          <p className="text-center text-[12px] text-ink-muted">
            No real payment is processed — this is a front-end prototype.
          </p>
        </form>

        {/* summary */}
        <aside className="rounded-2xl border border-hair p-5">
          <div className="eyebrow text-ink-muted">In your order</div>
          <ul className="mt-3 space-y-3">
            {cartLines.map(({ product, qty }) => (
              <li key={product.id} className="flex items-start justify-between gap-3 text-sm">
                <span className="text-ink">
                  {product.name} <span className="text-ink-muted">× {qty}</span>
                  <span className="mt-0.5 block"><Badge tone="safe">✓ doctor-approved</Badge></span>
                </span>
                <span className="font-semibold whitespace-nowrap">{formatRupees(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-hair pt-3 font-bold">
            <span>Total</span>
            <span>{formatRupees(cartTotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Fieldset({ legend, children }) {
  return (
    <fieldset className="rounded-2xl border border-hair p-5">
      <legend className="px-1 text-sm font-bold">{legend}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
function Field({ label, placeholder, full }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-[13px] font-medium text-ink-muted">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-xl border border-hair px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
