import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { CATEGORIES, discountPct, formatRupees } from "../data/catalog.js";
import { ProductArt, Price, Button, Badge } from "../components/ui.jsx";
import SafetySheet from "../components/SafetySheet.jsx";

export default function Cart() {
  const {
    cartLines, cartTotal, setQty, removeFromCart, approvalOf, evaluate,
    cartApproved, pendingApprovalCount, filterActive, openAvoidModal,
  } = useStore();
  const [sheetProduct, setSheetProduct] = useState(null);
  const navigate = useNavigate();

  const blockedLines = cartLines.filter((l) => filterActive && evaluate(l.product).status === "filtered");
  const canCheckout = cartApproved && blockedLines.length === 0;

  if (cartLines.length === 0)
    return (
      <Empty>
        <p className="text-ink-muted">Your cart is empty.</p>
        <Link to="/" className="mt-3 inline-block font-semibold text-brand hover:underline">← Browse products</Link>
      </Empty>
    );

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <p className="mt-1 text-[13px] text-ink-muted">
        Checkout unlocks once every item is cleared by your doctor — the safe-by-design step.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* lines */}
        <div className="divide-y divide-hair rounded-2xl border border-hair">
          {cartLines.map(({ product, qty }) => {
            const status = approvalOf(product.id);
            const blocked = filterActive && evaluate(product).status === "filtered";
            const cat = CATEGORIES[product.category];
            return (
              <div key={product.id} className="flex gap-4 p-4">
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <ProductArt product={product} className="h-24 w-24" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="eyebrow" style={{ color: cat.ink }}>{cat.label}</div>
                  <Link to={`/product/${product.slug}`} className="font-semibold text-ink hover:text-brand line-clamp-2">
                    {product.name}
                  </Link>
                  <div className="mt-1">
                    <Price price={product.price} mrp={product.mrp} pct={discountPct(product.price, product.mrp)} />
                  </div>

                  {/* per-line clearance status */}
                  <div className="mt-2">
                    {blocked ? (
                      <Badge tone="warn">Not safe for your avoid-list — remove to continue</Badge>
                    ) : status === "approved" ? (
                      <Badge tone="safe">✓ Cleared by your doctor</Badge>
                    ) : status === "pending" ? (
                      <span className="inline-flex items-center gap-2">
                        <Badge tone="teal">Awaiting approval</Badge>
                        <button onClick={() => setSheetProduct(product)} className="text-[12px] font-semibold text-brand hover:underline">
                          View / simulate reply
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSheetProduct(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-2.5 py-1.5 text-[12px] font-semibold text-white hover:opacity-90"
                      >
                        🩺 Review with your doctor to unlock
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(product.id)} className="text-ink-muted hover:text-warn text-sm" aria-label="Remove">
                    ✕
                  </button>
                  <Qty qty={qty} onDec={() => setQty(product.id, qty - 1)} onInc={() => setQty(product.id, qty + 1)} />
                </div>
              </div>
            );
          })}
        </div>

        {/* summary */}
        <aside className="rounded-2xl border border-hair p-5">
          <div className="eyebrow text-ink-muted">Order summary</div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-ink-muted">Subtotal</span>
            <span className="font-semibold">{formatRupees(cartTotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-ink-muted">Shipping</span>
            <span className="font-semibold text-safe">Free</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-hair pt-3 text-base font-bold">
            <span>Total</span>
            <span>{formatRupees(cartTotal)}</span>
          </div>

          {/* gate */}
          <div className="mt-4">
            {blockedLines.length > 0 ? (
              <div className="rounded-lg bg-warn-tint px-3 py-2 text-[12.5px] font-medium text-warn">
                Remove {blockedLines.length} item(s) flagged by your avoid-list to continue.{" "}
                <button onClick={openAvoidModal} className="underline">Review list</button>
              </div>
            ) : !cartApproved ? (
              <div className="rounded-lg bg-teal-tint px-3 py-2 text-[12.5px] font-medium text-teal">
                🔒 {pendingApprovalCount} item(s) need your doctor's sign-off before checkout.
              </div>
            ) : (
              <div className="rounded-lg bg-safe-tint px-3 py-2 text-[12.5px] font-semibold text-safe">
                ✓ All items cleared by your doctor — you're good to go.
              </div>
            )}
          </div>

          <Button full size="lg" className="mt-3" disabled={!canCheckout} onClick={() => navigate("/checkout")}>
            {canCheckout ? "Checkout" : "🔒 Checkout locked"}
          </Button>
          <Link to="/" className="mt-3 block text-center text-[13px] font-semibold text-brand hover:underline">
            Continue shopping
          </Link>
        </aside>
      </div>

      <SafetySheet product={sheetProduct} open={!!sheetProduct} onClose={() => setSheetProduct(null)} />
    </div>
  );
}

function Qty({ qty, onDec, onInc }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-hair">
      <button onClick={onDec} className="px-2.5 py-1 text-ink-muted hover:text-ink">−</button>
      <span className="w-7 text-center text-sm font-semibold">{qty}</span>
      <button onClick={onInc} className="px-2.5 py-1 text-ink-muted hover:text-ink">+</button>
    </div>
  );
}
function Empty({ children }) {
  return (
    <div className="mx-auto max-w-[600px] px-4 py-24 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-cream text-2xl">🛒</div>
      {children}
    </div>
  );
}
