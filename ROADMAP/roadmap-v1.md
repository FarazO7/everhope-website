# Prioritised Roadmap — Everhope

Built from the ten selected solutions only. Operating model: **design in week N,
build + deploy in week N+1**, one new feature entering design each week so design and
build run as parallel lanes and the company ships continuously. Each entry is one
distinct MVP feature — no MVP/scaled duplication.

Every item below carries the four required fields: **what it is, why it matters,
what is needed to build it, and how success is measured.**

## How this goes beyond the existing plan

This is not incremental tuning of the in-flight work (analytics, checkout optimisation,
pack/bundle variants, depletion-timed subscription/reorder, cart-recovery WhatsApp nudge,
AI PDP chatbot, EHR→WhatsApp coordinator flow, shipment tracking, PDP overhaul, static
recommendations). It opens product spaces the team has not yet explored:

- **Clinical-clearance infrastructure** (F-D, F-G) — operationalising the oncologist's
  authority *inside* the buying flow (share product info out; filter the catalog by the
  doctor's uploaded avoid-list in). The planned chatbot answers questions; this removes
  the question. New space.
- **Caregiver-as-payer architecture** (F-C) — treating buyer and payer as different people
  and building the patient→caregiver hand-off. The single-user cart assumption is unexamined
  in the current plan.
- **Symptom-led discovery** (F-A) — routing the catalog by treatment toxicity, not
  ingredient or physiological category. A different navigation model, not a filter tweak.
- **Cycle-aware retention** (F-H, F-I) — timing to the treatment calendar (respecting
  holidays/hospitalisation), where the planned reorder logic is depletion-timed and breaks.
- **Trust-based private acquisition** (F-B) — altruistic, one-to-one referral suited to a
  private diagnosis, where standard public referral/UGC fails.

Each overlap-adjacent item is explicitly differentiated from the planned work in its
detail block below.

## Prioritisation logic

**Gap-first.** The two stages failing their benchmark are Cart→Checkout (43.8% abandon)
and Checkout→Purchase (57.7% abandon). PDP→cart (8.84%) already beats the ~5% benchmark,
so discovery is not a failing gap.

- **Checkout→Purchase first** — worst rate, and a saved user converts 1:1 to revenue.
- **Cart→Checkout second** — bigger leak (328/mo) but each save is worth ~0.42 of a
  conversion until checkout is fixed.
- **Top-of-funnel third** — fix the bucket before filling it.
- **Retention last** — outside the failing gaps; protects LTV once the funnel holds.

**RICE.** Reach = monthly users at the targeted stage (749 carts, 421 checkouts,
~260 caregiver-involved carts, ~350 first-time buyers, ~4,000 engaged browsers).
Impact = lift in the stage metric weighted by survival to revenue (3 massive → 0.25 minimal).
Confidence and Effort analysed below.

| # | Feature (your idea) | Stage | R | I | C | E | RICE |
|---|---|---|---|---|---|---|---|
| F-D | Shareable clinical safety sheet (7) | Checkout→Purchase | 421 | 3 | 0.70 | 3 | **295** |
| F-E | Per-capsule value anchoring (8) | Checkout→Purchase | 421 | 1.5 | 0.80 | 2 | **253** |
| F-G | Oncologist avoid/allergy PDF filter (10) | Checkout→Purchase | 421 | 3 | 0.65 | 5 | **164** |
| F-F | Trial-size + taste-match + guarantee (9) | Checkout→Purchase | 350 | 2 | 0.75 | 4 | **131** |
| F-C | Shareable caregiver cart / pay link (5) | Cart→Checkout | 260 | 3 | 0.75 | 5 | **117** |
| F-A | Symptom-mapped catalog + symptom search (2+3) | Top-of-funnel | 4,000 | 0.5 | 0.80 | 3 | **533** |
| F-B | Private "gift a friend 10%" referral (4) | Top-of-funnel | 150 | 2 | 0.70 | 2 | **105** |
| F-H | Chemo calendar → cycle-aware nudges (1) | Retention | 200 | 2 | 0.70 | 4 | **70** |
| F-I | One-tap reorder (6) | Retention | 150 | 1 | 0.70 | 2 | **52** |

**Sequencing note.** Gap-first orders the tiers; RICE orders within a tier. One deliberate
adjustment: F-G is sequenced immediately after F-D rather than after F-E, because the two
share the same structured ingredient/allergen/interaction data layer (build them together)
and together they resolve the single largest cause of checkout→purchase abandonment —
clinical-safety clearance — from both directions. F-A carries the largest RICE reach but
the lowest Impact (0.5): it improves a stage already beating benchmark, so gap-first places
it after the checkout fixes.

---

## Pipeline schedule

| Week | Design lane | Build + Deploy lane |
|---|---|---|
| 1 | F-D Safety sheet | — |
| 2 | F-G Avoid/allergy filter | F-D ships |
| 3 | F-E Per-capsule anchoring | F-G ships (allergen-first MVP) |
| 4 | F-F Trial-size + taste-match | F-E ships |
| 5 | F-C Caregiver cart link | F-F ships |
| 6 | F-A Symptom catalog + search | F-C build (1 of 2) |
| 7 | F-B Referral | F-C ships (2 of 2) |
| 8 | F-H Chemo calendar | F-A ships |
| 9 | F-I One-tap reorder | F-B ships |
| 10 | — | F-H ships |
| 11 | Iterate on live features | F-I ships |
| 12 | Iterate on live features | Tune against success metrics |

**4-week horizon:** F-D, F-G, F-E shipped; F-F in build — all four are Checkout→Purchase,
directly attacking the worst-rate gap first.
**12-week horizon:** all nine shipped. Heavier builds (F-C secure links, F-G doctor-avoid
layer, F-H cycle scheduling) take a 2-week build; the schedule absorbs them and reserves
weeks 11–12 for measurement rather than padding with new features.

---

## Feature detail

### F-D — Shareable clinical safety sheet  (idea 7) — design wk1, ship wk2
- **What it is:** A one-tap action on the PDP that generates a clean, shareable sheet of the product's ingredients, safety & tolerance notes, allergens, and "things to consider," formatted for the patient to send to their oncologist (WhatsApp/PDF).
- **Why it matters:** The dominant Checkout→Purchase blocker is the patient wanting to cross-verify safety with their doctor before ingesting alongside active therapy. This packages the question they currently can't assemble themselves. Distinct from the planned AI PDP chatbot: this is a shareable static artifact for the patient's own oncologist, not conversational Q&A.
- **What is needed to build it:** Structured ingredient/allergen/safety data per SKU (the data layer F-G reuses), sheet template, share/export (WhatsApp, PDF).
- **Success metric:** Safety-sheet share rate; pending-clearance cart recovery rate; Checkout→Purchase rate vs the 42.3% baseline.

### F-G — Oncologist avoid/allergy PDF filter  (idea 10) — design wk2, ship wk3
- **What it is:** Patient/caregiver uploads the oncologist's allergy/avoid document; the catalog then shows only products free of those ingredients. Allergen-first MVP (structured tags); the free-text doctor avoid-list is a review-gated second layer.
- **Why it matters:** Resolves the safety blocker without a per-product round-trip to the doctor and without the patient needing pharmacological literacy — the doctor's document is the authority. Operationalises the 86% non-disclosure reality from the other side. Distinct from the planned AI PDP chatbot: deterministic filtering from an uploaded document, not Q&A.
- **What is needed to build it:** Allergen tagging (largely exists), document upload + parse (OCR), oncology-nutritionist review queue for free-text avoid-lists, filter logic that errs toward over-restriction when uncertain. Shares F-D's safety data layer.
- **Success metric:** Safe-filter usage; pending-clearance cart recovery rate; Checkout→Purchase rate; reduction in wrong-product returns.

### F-E — Per-capsule value anchoring  (idea 8) — design wk3, ship wk4
- **What it is:** PDP value-framing that displays per-capsule (and per-day/per-cycle) cost to anchor the price against a treatment-long horizon.
- **Why it matters:** Attacks cost shock — a multi-month regimen reads as steep as a lump sum but trivial per unit. A proven, low-effort conversion lever for cost-hesitant buyers.
- **What is needed to build it:** Per-unit price computation and PDP display component. Lowest build cost in Tier 1.
- **Success metric:** Checkout→Purchase rate at higher cart values; AOV.

### F-F — Trial-size + taste-match finder + tolerability guarantee  (idea 9) — design wk4, ship wk5
- **What it is:** A low-cost trial sachet as a first purchase, a taste-match finder (metallic/sweet-averse → sour-citrus or unflavoured picks), and a tolerability guarantee.
- **Why it matters:** De-risks the first ingestible commit for a nauseated patient with altered taste (dysgeusia affects up to 76%). Removes the "what if I can't even swallow it" barrier at the point of payment.
- **What is needed to build it:** Trial-size SKU/packaging ops, taste-tag mapping, finder UI, guarantee policy.
- **Success metric:** First-purchase completion rate; first-order AOV; downstream repeat (LTV).

### F-C — Shareable caregiver cart / payment link  (idea 5) — design wk5, ship wk7
- **What it is:** The patient builds and locks a cart, then forwards a secure cart/payment link to a caregiver who completes checkout and pays (UPI collect / pay-by-link).
- **Why it matters:** The structural root cause of both post-cart gaps — buyer ≠ payer. The patient researches; the caregiver holds the card and the executive capacity. Also removes the payment-instrument blocker at Checkout→Purchase. Distinct from the planned EHR→WhatsApp flow: that sends a coordinator's cart to hospital patients; this is the patient delegating to their own caregiver.
- **What is needed to build it:** Tokenised secure cart/pay link, patient↔caregiver linkage, WhatsApp delivery, UPI/pay-by-link payment. Heaviest Tier-2 build (2-week).
- **Success metric:** Caregiver handoff completion rate; Cart→Checkout rate vs 56.2% baseline; online-payment share.

### F-A — Symptom-mapped catalog + symptom search  (ideas 2+3) — design wk6, ship wk8
- **What it is:** Catalog/categories mapped to treatment toxicities (neuropathy, diarrhea, mucositis, dysgeusia, cachexia) plus a search bar that takes plain-language prompts ("chemo mouth," "metallic taste") and returns matched products.
- **Why it matters:** Patients navigate by symptom, not by ingredient or physiological category. This aligns discovery with how they actually search — improving session quality and match. (Top-of-funnel; PDP→cart already beats benchmark, so the gain is discovery/match, not a failing rate.)
- **What is needed to build it:** Symptom-toxicity taxonomy tagged across the catalog, synonym/plain-language search mapping, results UI.
- **Success metric:** Symptom-search → PDP → cart rate; share of sessions entering via symptom routes; bounce on symptom landings.

### F-B — Private "gift a friend 10%" referral  (idea 4) — design wk7, ship wk9
- **What it is:** A private, one-to-one invite a patient/caregiver shares directly with a friend, framed as "help your friend get 10% off" — give-only, no public posting.
- **Why it matters:** The trustworthy sharing in this category is private and altruistic; gift-framing removes the profiting-from-illness optic and makes the recommendation read as sincere. Referred traffic enters warm and converts above the cold baseline.
- **What is needed to build it:** Private invite/link generation, friend-discount application, attribution. Keep it private-channel and give-only.
- **Success metric:** Referral-sourced sessions and their Session→Purchase rate vs the 2.04% baseline; % trusted-source sessions.

### F-H — Chemo calendar → cycle-aware nudges  (idea 1) — design wk8, ship wk10
- **What it is:** A patient chemo calendar that times reorder nudges and check-ins to the treatment cycle.
- **Why it matters:** Protects retention/LTV. Distinct from the planned depletion-timed reorder nudge: depletion logic fails because it ignores treatment holidays and hospitalisation. Cycle-aware timing nudges at the right point in the actual treatment calendar.
- **What is needed to build it:** Cycle/date input, schedule model that respects pauses, nudge delivery (WhatsApp). 2-week build.
- **Success metric:** Repeat-purchase rate; nudge → reorder conversion; retention across cycles.

### F-I — One-tap reorder  (idea 6) — design wk9, ship wk11
- **What it is:** A single-tap reorder for returning patients, everything pre-saved, for users under cognitive load post-chemo.
- **Why it matters:** Removes the executive-function barrier from repeat purchase. Scope tightly as a cognitive-load reorder action; pairs with F-H (the calendar can surface the one-tap reorder at the right cycle moment) to stay distinct from the team's existing buy-now/reorder work.
- **What is needed to build it:** Saved-order state, one-tap confirm, address/payment retention. Pairs with F-H.
- **Success metric:** Reorder completion rate; repeat-purchase frequency.

---

## Prototype target

**F-D + F-G — the clinical-clearance pair.** Most distinctly cancer-patient-specific,
attacks the dominant Checkout→Purchase blocker from both directions (verify outward via the
shareable sheet, filter inward via the uploaded avoid-list), shares one data layer, and has
a clean, novel, demonstrable flow. F-C (shareable caregiver cart) is the second candidate.
