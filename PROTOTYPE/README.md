# Everhope — Supplement-Safety Prototype

A clickable, **front-end-only** prototype demonstrating two features that resolve the
biggest checkout-abandonment cause for oncology patients: the unanswered question
**"is this supplement safe with my treatment?"** Everhope answers it from both directions.

- **Feature A — Oncologist avoid/allergy filter ("filter inward").** Upload the
  oncologist's allergy/avoid list, confirm what was extracted (human-in-the-loop), and the
  catalogue hides unsafe products and badges the safe ones "Cleared for you".
- **Feature B — Shareable clinical safety sheet ("verify outward").** From a product page,
  generate a printable clinical safety sheet, share it (WhatsApp / copy link / PDF), and
  unlock checkout once the doctor replies "APPROVED".

> These are **adjunctive supplements, not prescription drugs.** The copy frames everything as
> a *safety aid* the patient confirms — it never replaces the oncologist's advice and makes no
> absolute medical claims.

## The flow a reviewer can run in under a minute

Catalogue → **Upload avoid-list** → catalogue filters to safe products → open a **Cleared**
product → **Review with your doctor** (safety sheet) → **simulate "APPROVED"** → cart unlocks
→ mocked checkout. The top-nav reaches every screen, and **How it works** (`/guide`) narrates
the whole story. No file handy? The upload modal has a **"Use the sample list"** shortcut.

## Stack

- **React + Vite + Tailwind v4** (design tokens reproduced from the live store — see
  [`../DESIGN_NOTES.md`](../DESIGN_NOTES.md)).
- **HashRouter** so the static build works on any host and survives a hard refresh.
- **No backend, no auth, no real APIs, no localStorage** — every catalogue item, the
  avoid-list "OCR", the share actions and the doctor approval are mocked in React memory.
  Refresh = clean slate.

## Run locally

```bash
cd PROTOTYPE
npm install
npm run dev          # http://localhost:5173
```

Production build + preview:

```bash
npm run build        # outputs ./dist
npm run preview      # serves the build
# or: node serve-dist.mjs   (tiny zero-dependency static server for ./dist)
```

## Deploy to Vercel (shareable link)

The app is a static SPA — Vercel needs one setting: **Root Directory = `PROTOTYPE`**.

**Option 1 — Git import (one-click):**
1. Push this repo to GitHub.
2. In Vercel → *Add New… → Project* → import the repo.
3. Set **Root Directory** to `PROTOTYPE`. Framework auto-detects as **Vite**
   (build `npm run build`, output `dist`). Deploy.

**Option 2 — CLI:**
```bash
cd PROTOTYPE
npm i -g vercel
vercel            # first run links/auth; accept Vite defaults
vercel --prod     # prints the live URL
```

[`vercel.json`](vercel.json) already pins the build command, output directory and framework.

## Mock data

- 7 SKUs across the store's symptom collections (energy/weight, gut/immune,
  inflammation/pain, nerve/sleep) in [`src/data/catalog.js`](src/data/catalog.js).
- A sample oncologist avoid-list + the matcher in [`src/data/avoidList.js`](src/data/avoidList.js).
  Four SKUs are intentionally caught (soy, curcumin, fish + vitamin E, green-tea/EGCG) so the
  filter visibly removes products; three stay cleared.
- The matcher uses a **synonym map** (soy lecithin, *Camellia sinensis*, mixed tocopherols…)
  and **errs toward exclusion**: when it can't confirm a product is safe (e.g. an unconfirmable
  vitamin-E dose) it filters the product out and says why.
