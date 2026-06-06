import { useStore } from "../state/StoreContext.jsx";

// Tiny toast for mocked actions. Reads the single `toast` slot from the store.
export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  const tones = {
    neutral: "bg-ink text-white",
    safe: "bg-safe text-white",
    brand: "bg-brand text-white",
    teal: "bg-teal text-white",
  };
  return (
    <div className="no-print fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${tones[toast.tone] || tones.neutral}`}
        role="status"
      >
        {toast.message}
      </div>
    </div>
  );
}
