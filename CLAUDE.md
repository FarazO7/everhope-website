# CLAUDE.md — AI Prompt Log

This file logs the prompts used while building this submission and how the thinking
evolved across the session. It was updated after each meaningful AI interaction, not
written at the end. Prompts are recorded faithfully (condensed), each with the intent
behind it and what it changed. Course-corrections are kept in — they are the point.

Tool: Claude. Mode: a blunt, directive "Absolute Mode" was set at the start to force
high-fidelity reasoning over agreeable tone.

---

## Phase 0 — Setup, context, constraints

**P0.1** — "Operate in Absolute Mode: eliminate filler, hype, soft asks, transitions;
blunt directive phrasing; no engagement-optimising behaviour; speak to the underlying
reasoning; terminate after delivering info."
*Intent:* strip agreeableness so every answer is reasoning, not reassurance. Set the
working contract for the whole session.

**P0.2** — "[Funnel-data screenshot] I'm working on store.everhope.care. Go through the
site and use the screenshot for context."
*Intent:* load the real product and the funnel before any analysis. Forced the model to
read the live site, not assume.

**P0.3** — "Don't give me answers, just absorb."
*Intent:* prevent premature solutioning while I fed in context. Repeated deliberately
through the session as a control on scope.

**P0.4 / P0.5 / P0.6** — "[Screenshots] This is what the team has already planned / these
are the deliverables / understand the evaluation and rules."
*Intent:* establish the hard constraints — what's off-limits (in-flight work), what must
be produced (roadmap + prototype + repo), and how it's judged.

**P0.7** — "Any clarifying questions before solving?"
*Intent:* check for blocking unknowns instead of guessing. Surfaced candidate-vs-evaluator
and repo-existence questions.

**P0.8** — "Give me a sequenced execution plan." → **P0.9** — "Need to do everything in
one day."
*Intent:* convert the deliverables into an ordered plan, then compress it to a single-day
sprint with time blocks.

---

## Phase 1 — Strategy

**P1.1** — "Repo created; move to strategic framing." → "[repo URL]"
*Intent:* anchor every output to a committable file from day one.

**P1.2** — "[Deep-research doc] Improve the strategic framing based on this research."
*Intent:* ground the strategy in evidence rather than priors. Shifted the framing to the
trust-vacuum thesis (50–70% self-supplement without telling their oncologist).

**P1.3** — "Confirm the strategy takes nothing from the existing roadmap and adds no
incremental features on top of it."
*Intent:* enforce the 'beyond the plan' constraint explicitly before going further.
*Evolution:* forced a differentiation pass — the only adjacency (Prescribe Link vs
EHR→WhatsApp) was called out and separated.

---

## Phase 2 — Roadmap structure

**P2.1** — "Move to the roadmap." → **P2.2** — "Fast-paced company: design in week N,
build+deploy in week N+1, staggered weekly; one MVP feature per slot, no MVP/scaled
duplication; prioritise with RICE."
*Intent:* impose the real delivery cadence (pipelined lanes) and a defensible
prioritisation method, not a generic phase list.

---

## Phase 3 — Problem definition (the core narrowing)

**P3.1** — "Don't be comprehensive. Just name each problem and why. Brief."
*Intent:* force problem clarity before solutions.

**P3.2** — "Which funnel stages are we focusing on? Does solving these actually fix the
drop?"
*Intent:* stress-test whether the proposed problems map to the measured leak.
*Evolution:* exposed that only some ideas touched the funnel; the rest were new channels
or retention — an honest reframe rather than overclaiming.

**P3.3** — "Absorb only: focus on the funnel stages, and within them only the parts NOT
meeting benchmark."
*Intent:* hard scope cut. Eliminated PDP→cart (already above the ~5% benchmark) and locked
focus on Cart→Checkout (43.8%) and Checkout→Purchase (57.7%).

**P3.4** — "Find more problems for cart→checkout and checkout→purchase, using the cancer-
patient behaviour research. Problems + why only."
*Intent:* push past the obvious into research-grounded, audience-specific causes.

**P3.5** — "Sessions are also low. Could a referral plan or shareable UGC bring organic
traffic?" → **P3.6** — "Reframe referral as 'help your friend get 10% off'?"
*Intent:* open the top-of-funnel question, then pressure-test the mechanism.
*Evolution:* model pushed back that public referral/UGC fails for a private diagnosis;
iterated to a private, give-only, gift-framed referral that fits the audience. A clear
prompt→critique→refinement loop.

**P3.7** — "[2nd deep-research doc] Top-of-funnel is still a problem alongside the two
checkout stages. Give the underlying problems. Research-grounded. Problems + why."
*Intent:* go from symptoms to root causes (buyer≠payer, chemo-brain checkout load,
offline async clinical approval).

**P3.8** — "Absorb: these are adjunctive supplements, not prescription drugs."
*Intent:* correct the clinical-approval framing — voluntary interaction-fear clearance,
not a prescription/regulatory gate. Reshaped problems 6/11.

**P3.9** — "Give the consolidated problems for the stages we're working on."
*Intent:* lock a canonical, de-duplicated problem set with the supplement-not-drug lens.

**P3.10** — "[3rd deep-research doc, Gemini] Find more problems; focus on the two checkout
stages."
*Intent:* a final evidence pass. Added the 86% non-disclosure reality, the can't-package-
the-question gap, phase-inappropriate-product trust erosion, and volume vs taste as
separate tolerability axes. Also surfaced honestly that the new doc only *corroborated*
cart→checkout rather than adding causes.

---

## Phase 4 — Ideation

**P4.1** — "Define the product metrics we're moving and how they tie to product outcome and
business outcome."
*Intent:* build the Outcome→Problem→Solution spine before ideating, so every idea has a
metric to answer to. Established Session→Purchase (2.04%) as the product north star inside
Revenue = Sessions × conversion × AOV.

**P4.2** — "[Ideation principles + two method URLs] Absorb these before ideating."
*Intent:* adopt a real ideation discipline — quantity, suspend judgement, novelty over
relevance, How-Might-We reframing, mind-mapping.

**P4.3** — "Ideate for each problem and map each to the product metric, product outcome,
and business outcome."
*Intent:* diverge widely (HMW per problem, multiple ideas each) while keeping the metric
mapping attached.

**P4.4** — "What is HMW?"
*Intent:* quick definitional check mid-flow.

---

## Phase 5 — Prioritisation

**P5.1** — "Prioritise the solutions by the funnel gap to solve first, using RICE.
Impact = change in product metric → business metric; Confidence I analyse; Reach from the
funnel; Effort I analyse."
*Intent:* a precise RICE definition with funnel-grounded Reach.
*Evolution:* produced gap-first tiers (Checkout→Purchase first) with two documented
overrides where RICE diverged from strategic weight — used the method without being a slave
to it.

---

## Phase 6 — Solution selection

**P6.1** — "These nine ideas are the ones I like." → **P6.2** — "Add a tenth: upload the
oncologist's allergy/avoid PDF; recommend only products free of those ingredients."
*Intent:* converge from the divergent set to a chosen portfolio, then add the inbound
counterpart to the shareable-safety-sheet idea.
*Evolution:* model flagged overlap risks (3 of the picks needed differentiation from
in-flight work) and the parsing/liability guardrails on the PDF-filter idea.

---

## Phase 7 — Roadmap build

**P7.1** — "Build the roadmap using only my solutions."
*Intent:* turn the chosen ten into the pipelined, RICE-scored, gap-first roadmap with the
four required fields per item.

**P7.2** — "[Re-stated the deliverable spec] 4-week + 12-week, every item with what/why/
build/measure, beyond the plan, not incremental, structured doc."
*Intent:* conformance check. Added an explicit 'how this goes beyond the existing plan'
section naming the unexplored product spaces and the in-flight work it does not duplicate.

---

## Phase 8 — Prompt log

**P8.1** — "Give me the prompts to add to CLAUDE.md."
*Intent:* produce this log so the commit history shows how the thinking evolved.

---

## Course-corrections that shaped the output

These are the moments the direction changed — the evidence that this was iterated, not
accepted first-draft:

1. **Scope narrowing (P3.3):** dropped PDP→cart once the data showed it beats benchmark;
   refused to "fix" a stage that wasn't failing.
2. **Honest funnel mapping (P3.2):** admitted most early ideas didn't address the measured
   drop, instead of claiming they did.
3. **Referral pivot (P3.5→P3.6):** rejected public referral/UGC for a private diagnosis;
   landed on private, give-only, gift-framed referral.
4. **Clinical reframe (P3.8):** corrected approval framing from prescription-gate to
   voluntary interaction-clearance once told these are supplements, not drugs.
5. **RICE overrides (P5.1):** kept two solutions above their RICE rank with a written
   rationale (structural root cause / shared data layer), rather than ranking mechanically.
6. **Beyond-the-plan enforcement (P1.3, P7.2):** repeatedly differentiated each feature
   from in-flight work so nothing read as incremental.

---

## Phase 9 — Prototype build (front-end only, in `/PROTOTYPE`)

Build log for the clickable prototype demonstrating the two chosen safety features
(Feature A: oncologist avoid/allergy filter — "filter inward"; Feature B: shareable
clinical safety sheet — "verify outward"). Appended step-by-step as it was built.

**P9.1 — Study the live site, write DESIGN_NOTES.md.**
Fetched home + a PDP + a collection page from the rendered site and pulled the theme's
CSS custom properties from raw HTML (couldn't touch Shopify source). Captured authoritative
tokens: font **Libre Franklin**; ink `#1C1C1C`; brand crimson `#D72950` (`--button-text-color`);
green `#27AE60` (reused for the "Cleared for you" safety affordance); amber stars `#F5A623`;
teal clinical accent; warm borders. Recorded the PDP's real section order
(Description → Safety & Tolerance → Suggested Use → FAQ → Reviews) and the three
Safety & Tolerance sub-blocks, which the prototype reproduces structurally rather than
imports. *Decision:* reproduce, don't import; green is the safety colour, crimson stays the
single brand accent.
