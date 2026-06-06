import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../state/StoreContext.jsx";
import { Badge } from "./ui.jsx";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Everhope home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white font-extrabold">
        e
      </span>
      <span className="text-lg font-extrabold tracking-tight text-ink">everhope</span>
      <span className="hidden sm:inline text-[11px] font-semibold text-ink-muted">
        oncology
      </span>
    </Link>
  );
}

const navItem = ({ isActive }) =>
  `text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
    isActive ? "text-brand border-brand" : "text-ink border-transparent hover:text-brand"
  }`;

export default function Navbar() {
  const { cartCount, filterActive, activeKeys, openAvoidModal, clearAvoidList } = useStore();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-hair no-print">
      {/* demo ribbon */}
      <div className="bg-teal text-white text-center text-[12px] py-1 px-3">
        Prototype · <strong className="font-semibold">Clear supplement safety before you buy</strong>{" "}
        — filter inward + verify outward
      </div>

      <div className="mx-auto max-w-[1200px] px-4 h-16 flex items-center gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-6 ml-2">
          <NavLink to="/" end className={navItem}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={navItem}>
            Cart
          </NavLink>
          <NavLink to="/guide" className={navItem}>
            How it works
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {filterActive ? (
            <button
              onClick={clearAvoidList}
              title="Avoid-list applied — click to clear"
              className="group inline-flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe-tint px-3 py-1.5 text-xs font-semibold text-safe"
            >
              <ShieldDot />
              <span className="hidden sm:inline">Avoid-list active · {activeKeys.length} items</span>
              <span className="sm:hidden">{activeKeys.length}</span>
              <span className="text-safe/60 group-hover:text-warn">✕</span>
            </button>
          ) : (
            <button
              onClick={openAvoidModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-white px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/5"
            >
              <ShieldDot tone="brand" />
              <span className="hidden sm:inline">Upload avoid-list</span>
              <span className="sm:hidden">Avoid-list</span>
            </button>
          )}

          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-hair hover:bg-cream"
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20" r="1.3" fill="currentColor" />
              <circle cx="17.5" cy="20" r="1.3" fill="currentColor" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* mobile secondary nav */}
      <div className="md:hidden border-t border-hair px-4 py-2 flex gap-4">
        {[
          ["/", "Shop"],
          ["/cart", "Cart"],
          ["/guide", "How it works"],
        ].map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className={`text-sm font-medium ${loc.pathname === to ? "text-brand" : "text-ink"}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}

function ShieldDot({ tone = "safe" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
