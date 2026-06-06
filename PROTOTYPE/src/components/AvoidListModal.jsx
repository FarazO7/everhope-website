import { useEffect, useRef, useState } from "react";
import { useStore } from "../state/StoreContext.jsx";
import { AVOID_TOKENS, SAMPLE_AVOID_LIST } from "../data/avoidList.js";
import { Button, Badge } from "./ui.jsx";

// FEATURE A — "filter inward".
// Mock upload -> mock OCR parse -> human-in-the-loop confirm -> apply to catalogue.
// No real OCR, no backend: on "upload" we reveal a pre-extracted list for the patient to
// review and edit BEFORE anything filters. Unticking an item means it won't be applied.
export default function AvoidListModal() {
  const { avoidModalOpen, closeAvoidModal, applyAvoidList, activeKeys, showToast } = useStore();

  const [stage, setStage] = useState("upload"); // upload | parsing | review
  const [fileName, setFileName] = useState(SAMPLE_AVOID_LIST.fileName);
  const [checked, setChecked] = useState(() => new Set(AVOID_TOKENS.map((t) => t.key)));
  const fileRef = useRef(null);

  // Reset to a sensible stage each time the modal opens (re-edit if already applied).
  useEffect(() => {
    if (avoidModalOpen) {
      setStage(activeKeys.length ? "review" : "upload");
      setChecked(new Set(activeKeys.length ? activeKeys : AVOID_TOKENS.map((t) => t.key)));
    }
  }, [avoidModalOpen, activeKeys]);

  if (!avoidModalOpen) return null;

  const toggle = (key) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const runParse = (name) => {
    if (name) setFileName(name);
    setStage("parsing");
    setChecked(new Set(AVOID_TOKENS.map((t) => t.key)));
    setTimeout(() => setStage("review"), 1100); // mock OCR latency
  };

  const onPick = (e) => {
    const f = e.target.files?.[0];
    runParse(f ? f.name : null);
  };

  const apply = () => {
    const keys = AVOID_TOKENS.filter((t) => checked.has(t.key)).map((t) => t.key);
    if (keys.length === 0) return;
    applyAvoidList(keys, { ...SAMPLE_AVOID_LIST, fileName });
    closeAvoidModal();
    showToast(`Avoid-list applied — catalogue filtered for your safety`, "safe");
  };

  const allergens = AVOID_TOKENS.filter((t) => t.layer === "allergen");
  const avoid = AVOID_TOKENS.filter((t) => t.layer === "avoid");

  return (
    <div className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={closeAvoidModal}
      />
      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl">
        {/* header */}
        <div className="sticky top-0 flex items-start gap-3 border-b border-hair bg-white px-5 py-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
            <ShieldIcon />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold leading-tight">Your oncologist's avoid-list</h2>
            <p className="text-[13px] text-ink-muted">
              We only show products that clear it. You confirm what we found.
            </p>
          </div>
          <button onClick={closeAvoidModal} className="text-ink-muted hover:text-ink text-xl leading-none">
            ✕
          </button>
        </div>

        <div className="px-5 py-5">
          {/* STEP RAIL */}
          <ol className="mb-5 flex items-center gap-2 text-[12px] font-semibold">
            <Step n={1} label="Upload" active={stage === "upload"} done={stage !== "upload"} />
            <Rail />
            <Step n={2} label="Review" active={stage === "review"} done={false} />
            <Rail />
            <Step n={3} label="Apply" active={false} done={false} />
          </ol>

          {stage === "upload" && (
            <div>
              <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" hidden onChange={onPick} />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-hair hover:border-brand/50 hover:bg-cream transition-colors px-6 py-9 text-center"
              >
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
                  <UploadIcon />
                </div>
                <div className="font-semibold text-ink">Upload your oncologist's allergy / avoid list</div>
                <div className="mt-1 text-[13px] text-ink-muted">PDF, JPG or PNG — we'll read it for you</div>
              </button>
              <button
                onClick={() => runParse(SAMPLE_AVOID_LIST.fileName)}
                className="mt-3 w-full text-center text-[13px] font-semibold text-brand hover:underline"
              >
                No file handy? Use the sample list to try it →
              </button>
              <Disclaimer />
            </div>
          )}

          {stage === "parsing" && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
              <div className="font-semibold">Reading {fileName}…</div>
              <div className="text-[13px] text-ink-muted">Extracting allergies and avoid notes</div>
            </div>
          )}

          {stage === "review" && (
            <div>
              <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-cream px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileIcon />
                  <span className="truncate text-[13px] font-medium">{fileName}</span>
                </div>
                <button onClick={() => setStage("upload")} className="shrink-0 text-[12px] font-semibold text-brand hover:underline">
                  Replace
                </button>
              </div>

              <p className="mb-4 text-[13px] text-ink-muted">
                Here's what we read. <strong className="text-ink">Untick anything that isn't yours</strong> before
                we apply it — you're in control.
              </p>

              {/* LAYER 1 — structured allergens */}
              <Layer
                title="Allergies"
                tag="Structured"
                tone="warn"
                hint="Matched exactly against product allergen labels."
                items={allergens}
                checked={checked}
                toggle={toggle}
              />

              {/* LAYER 2 — free-text avoid notes */}
              <Layer
                title="Doctor's avoid notes"
                tag="Free text"
                tone="teal"
                hint="Read from the note text — broader, so we match synonyms too."
                items={avoid}
                checked={checked}
                toggle={toggle}
                className="mt-4"
              />

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-safe-tint px-3 py-2.5 text-[12.5px] text-safe">
                <span className="mt-0.5">🛡️</span>
                <span>
                  When we <strong>can't be sure</strong> a product fits a note (e.g. a vitamin-E amount we
                  can't confirm), we leave it out rather than risk it.
                </span>
              </div>

              <Disclaimer />
            </div>
          )}
        </div>

        {/* footer actions */}
        {stage === "review" && (
          <div className="sticky bottom-0 flex items-center gap-3 border-t border-hair bg-white px-5 py-4">
            <span className="text-[13px] text-ink-muted">
              {checked.size} of {AVOID_TOKENS.length} will be applied
            </span>
            <Button className="ml-auto" disabled={checked.size === 0} onClick={apply}>
              Apply to catalogue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Layer({ title, tag, tone, hint, items, checked, toggle, className = "" }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center gap-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <Badge tone={tone}>{tag}</Badge>
      </div>
      <p className="mb-2 text-[12px] text-ink-muted">{hint}</p>
      <div className="space-y-2">
        {items.map((t) => {
          const on = checked.has(t.key);
          return (
            <label
              key={t.key}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                on ? "border-brand/40 bg-brand/[0.03]" : "border-hair bg-white opacity-70"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggle(t.key)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
              />
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{t.label}</span>
                  {t.certainty === "uncertain" && <Badge tone="warn">exclude if unsure</Badge>}
                </span>
                <span className="block text-[12px] text-ink-muted">{t.note}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Step({ n, label, active, done }) {
  return (
    <li className="flex items-center gap-1.5">
      <span
        className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${
          active ? "bg-brand text-white" : done ? "bg-safe text-white" : "bg-cream text-ink-muted border border-hair"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span className={active ? "text-brand" : "text-ink-muted"}>{label}</span>
    </li>
  );
}
const Rail = () => <span className="h-px flex-1 bg-hair" />;

function Disclaimer() {
  return (
    <p className="mt-4 text-[11.5px] leading-relaxed text-ink-muted">
      This is a <strong>safety aid</strong>, not medical advice. You confirm the extracted list, and it
      does not replace your oncologist's guidance. These are adjunctive supplements, not prescription drugs.
    </p>
  );
}

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 16V4M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" strokeLinecap="round" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
);
