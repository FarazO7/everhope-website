import { CertRow } from "./ui.jsx";

const CERTS = ["GMP", "HACCP", "FSSAI", "FDA Registered", "ISO"];

export default function Footer() {
  return (
    <footer className="no-print mt-16 border-t border-hair bg-cream">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white font-extrabold">
                e
              </span>
              <span className="text-base font-extrabold tracking-tight">everhope oncology</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">
              Supplements that support cancer care — curated and reviewed by oncology experts.
              You don't have to navigate cancer alone.
            </p>
            <CertRow certs={CERTS} className="mt-4" />
          </div>
          <div>
            <div className="eyebrow text-ink-muted mb-2">Shop</div>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              <li>Energy & Weight Support</li>
              <li>Gut & Immune Care</li>
              <li>Inflammation & Pain</li>
              <li>Sleep, Nerve & Metabolism</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-ink-muted mb-2">Care</div>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              <li>Ask an Expert</li>
              <li>Oncology Nutritionist Reviewed</li>
              <li>Third Party Tested</li>
              <li>1 Lakh+ Patients Treated</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-hair pt-5 text-xs text-ink-muted">
          Front-end prototype for demonstration only — all products, data, uploads and
          approvals are mocked. These are adjunctive supplements, not prescription drugs.
          Nothing here replaces your oncologist's advice.
        </p>
      </div>
    </footer>
  );
}
