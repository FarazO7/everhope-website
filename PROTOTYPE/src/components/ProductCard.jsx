import { Link } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { CATEGORIES, discountPct } from "../data/catalog.js";
import { ProductArt, Stars, Price, Badge, Button } from "./ui.jsx";

// One catalog card. When an avoid-list is applied, cleared products get a green
// "Cleared for you" badge; filtered products are normally hidden by the catalog, but if
// the reviewer chooses to reveal them they render dimmed with the reason(s) they were cut.
export default function ProductCard({ product, revealFiltered = false }) {
  const { evaluate, addToCart, showToast, filterActive } = useStore();
  const ev = evaluate(product);
  const cat = CATEGORIES[product.category];
  const isFiltered = ev.status === "filtered";

  if (isFiltered && !revealFiltered) return null; // hidden "for your safety"

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white transition-shadow ${
        isFiltered ? "border-warn/30" : "border-hair hover:shadow-md"
      }`}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative">
          <ProductArt product={product} rounded="rounded-none" className="aspect-square w-full" />

          {filterActive && ev.status === "cleared" && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-safe px-2.5 py-1 text-[11px] font-bold text-white shadow">
              <Check /> Cleared for you
            </span>
          )}
          {isFiltered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/82 p-3 text-center backdrop-blur-[1px]">
              <Badge tone="warn">Filtered for your safety</Badge>
              <ul className="mt-1 space-y-0.5 text-[12px] font-medium text-warn">
                {ev.matches.map((m) => (
                  <li key={m.key}>
                    {m.label}
                    {m.certainty === "uncertain" ? " (couldn't confirm)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="eyebrow mt-2" style={{ color: cat.ink }}>
          {cat.label}
        </div>
        <Link to={`/product/${product.slug}`} className="mt-0.5">
          <h3 className="text-[15px] font-semibold leading-snug text-ink line-clamp-2 group-hover:text-brand">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-[12.5px] text-ink-muted line-clamp-2">{product.short}</p>

        <div className="mt-auto pt-3">
          <Price price={product.price} mrp={product.mrp} pct={discountPct(product.price, product.mrp)} />
          <div className="mt-2.5">
            {isFiltered ? (
              <Button variant="ghost" size="sm" full disabled title="Not safe against your avoid-list">
                Not for your list
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                full
                onClick={() => {
                  addToCart(product.id);
                  showToast(`Added “${product.name}” to cart`, "brand");
                }}
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
