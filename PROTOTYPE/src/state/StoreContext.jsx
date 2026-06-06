import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PRODUCTS } from "../data/catalog.js";
import { evaluateProduct } from "../data/avoidList.js";

// Single source of truth for the whole prototype. Everything lives in React memory only —
// no localStorage, no backend, no persistence (per the brief). Refresh = clean slate.
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // ---- Feature A: the applied oncologist avoid-list ------------------------------------
  // activeKeys = the avoid tokens the patient CONFIRMED in the upload modal. Empty until
  // they upload + confirm. `appliedList` keeps the file meta for display.
  const [activeKeys, setActiveKeys] = useState([]);
  const [appliedList, setAppliedList] = useState(null);

  const applyAvoidList = useCallback((keys, listMeta) => {
    setActiveKeys(keys);
    setAppliedList(listMeta);
  }, []);
  const clearAvoidList = useCallback(() => {
    setActiveKeys([]);
    setAppliedList(null);
  }, []);

  const filterActive = activeKeys.length > 0;

  // Evaluate any product against the active list.
  const evaluate = useCallback((product) => evaluateProduct(product, activeKeys), [activeKeys]);

  // ---- Lightweight global UI state -----------------------------------------------------
  // The avoid-list upload modal is global so it can be opened from the nav OR the catalog.
  const [avoidModalOpen, setAvoidModalOpen] = useState(false);
  const openAvoidModal = useCallback(() => setAvoidModalOpen(true), []);
  const closeAvoidModal = useCallback(() => setAvoidModalOpen(false), []);

  // Toasts for mocked actions (sheet sent, copied, added to cart, ...).
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, tone = "neutral") => {
    setToast({ message, tone, id: Date.now() });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3200);
  }, []);

  // ---- Feature B: per-product clinical sign-off ----------------------------------------
  // status: "none" -> "pending" (sheet shared, awaiting reply) -> "approved" (unlocks checkout)
  const [approvals, setApprovals] = useState({}); // { [productId]: "pending" | "approved" }

  const sendSheet = useCallback((productId) => {
    setApprovals((prev) => ({ ...prev, [productId]: "pending" }));
  }, []);
  // Mocked async "Reply APPROVED" — in a real build this would be an inbound webhook.
  const simulateApproval = useCallback((productId) => {
    setApprovals((prev) => ({ ...prev, [productId]: "approved" }));
  }, []);
  const approvalOf = useCallback((productId) => approvals[productId] || "none", [approvals]);

  // ---- Cart ----------------------------------------------------------------------------
  const [cart, setCart] = useState([]); // [{ id, qty }]

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);
  const setQty = useCallback((id, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);
  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);

  const cartLines = useMemo(
    () =>
      cart
        .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id) }))
        .filter((l) => l.product),
    [cart],
  );
  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [cartLines],
  );

  // Checkout is gated until every item in the cart has an approved safety sheet — this is
  // the "cart unlocks" moment of the narrative.
  const cartApproved = useMemo(
    () => cartLines.length > 0 && cartLines.every((l) => approvals[l.id] === "approved"),
    [cartLines, approvals],
  );
  const pendingApprovalCount = useMemo(
    () => cartLines.filter((l) => approvals[l.id] !== "approved").length,
    [cartLines, approvals],
  );

  const value = {
    // Feature A
    activeKeys,
    appliedList,
    filterActive,
    applyAvoidList,
    clearAvoidList,
    evaluate,
    // Feature B
    approvals,
    sendSheet,
    simulateApproval,
    approvalOf,
    // Cart
    cart,
    cartLines,
    cartCount,
    cartTotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    cartApproved,
    pendingApprovalCount,
    // Global UI
    avoidModalOpen,
    openAvoidModal,
    closeAvoidModal,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
