# Strategic Framing

## The thesis: a clinical-permission vacuum, not a conversion problem

Up to 86% of cancer patients do not tell their oncologist they are taking supplements.
They self-supplement in a vacuum — sourcing from forums, caregivers, and general
e-commerce — because they cannot get clinical permission fast enough, and the anxiety of
doing nothing feels worse than the risk of doing something wrong.

These are adjunctive supplements, not prescription drugs. So the blocker is not a
regulatory or dispensing gate — it is a voluntary fear of interactions with active therapy,
seeking the oncologist's clearance before ingesting anything alongside treatment. The single
most common objection is the patient's belief, often from their own doctor, that they should
"stop all supplements during treatment."

Everhope's real competition is not Esperer or Ensure. It is the unguided, sometimes
dangerous self-supplementation already happening across most of this patient base. The
opportunity is to become the safe, cleared alternative to behaviour that is already occurring.

**Where the thesis meets the funnel.** This permission question does not peak while browsing
— it peaks at the moment of financial commitment. That is precisely why Checkout→Purchase
abandons at 57.7% and Cart→Checkout at 43.8%, while PDP→cart (8.84%) already beats the ~5%
benchmark. The strategy's thesis and the funnel's worst leak are the same thing. Resolving
clinical permission is therefore simultaneously the highest-leverage funnel work and a new
product space — the two are not in tension.

## What this is and is not

This is not CRO, more trust badges, or faster checkout. It is the construction of three
pieces of product infrastructure the existing plan has not explored: a clinical-clearance
layer, a caregiver-as-payer architecture, and a symptom-led discovery and trust-acquisition
model. That this infrastructure also repairs the worst-failing funnel stage is a consequence,
not the goal.

---

## Pillar 1 — Clinical-clearance infrastructure (the core)

Operationalise the oncologist's authority *inside* the buying flow, in both directions:

- **Verify outward** — a shareable clinical safety sheet (ingredients, safety & tolerance,
  allergens, interaction notes) the patient sends to their own oncologist for a fast yes.
  *(Roadmap F-D; prototype.)*
- **Filter inward** — upload the oncologist's allergy/avoid document and the catalog filters
  itself to products free of those ingredients, erring toward over-restriction when unsure.
  *(Roadmap F-G; prototype.)*

This is distinct from the planned AI PDP chatbot. The chatbot answers questions; this removes
the question — through a static artifact and a deterministic, document-driven filter. It also
encodes ASCO/ESPEN alignment (flagging phase-inappropriate items such as high-dose
antioxidants during active treatment), which builds credibility with patients and clinicians.

This is where the earlier **Diagnostic Commerce** idea evolved. Rather than biomarker →
supplement recommendation, the clinical document → clearance path reaches the same end —
clinical data driving safe commerce — more directly, with no pharmacological literacy
required of the patient and a tighter line to the permission blocker.

Esperer's prescription-only model proves clinical distribution works; Everhope makes it
self-serve and document-driven instead of dependent on hospital procurement.

## Pillar 2 — Caregiver-as-payer architecture

In this category the buyer and the payer are usually different people. The patient — fatigued,
under "chemo brain," with diminished executive function — researches and builds the cart.
The caregiver, who holds the card and the administrative capacity, completes it. Caregivers
drive an estimated 30–40% of purchases. The current single-user cart has no hand-off, so it
stalls at exactly the patient→caregiver transfer.

The architecture: the patient locks a cart and forwards a secure cart/payment link to their
caregiver, who pays via UPI or pay-by-link. *(Roadmap F-C.)* This is distinct from the planned
EHR→WhatsApp flow, which sends a hospital coordinator's cart to inpatients — here the patient
delegates to their own family. It also shifts the segment off COD, easing the ₹3,000 cap
friction at checkout.

## Pillar 3 — Symptom-led discovery and private trust acquisition

Patients navigate by treatment toxicity — metallic taste and dysgeusia (up to 76%), mucositis,
neuropathy, diarrhoea — not by ingredient or physiological category. The catalog should be
routed and searchable in that language: symptom-mapped categories and a plain-language search
("chemo mouth," "metallic taste") that returns matched products. *(Roadmap F-A.)* Because
PDP→cart already beats benchmark, this is a discovery-quality and match play, not a failing-
rate fix.

For acquisition, the trustworthy sharing in this category is private and altruistic — a
private diagnosis is not broadcast for a discount. A one-to-one, give-only "help your friend
get 10% off" invite fits the audience and brings warm traffic that converts above the cold
baseline. *(Roadmap F-B.)* Public referral and UGC-for-reward were rejected as a poor fit.

## Retention layer (LTV)

Outside the failing funnel gaps, two features protect lifetime value once the funnel holds:
a **cycle-aware chemo calendar** that times nudges to the treatment calendar — distinct from
the planned depletion-timed reorder nudge, which breaks because it ignores treatment holidays
and hospitalisation *(F-H)* — and a **one-tap reorder** for patients under cognitive load,
scoped to pair with the calendar *(F-I)*.

---

## Considered and deprioritised

- **Diagnostic Commerce (bloodwork → recommendation):** absorbed into the document-driven
  clearance (F-G). The avoid-list is a lower-literacy, more direct route to the same
  permission outcome.
- **Prescribe Link (clinician-generated cart):** the highest-trust acquisition channel, but
  carries higher build cost and expert-adoption risk; deferred in favour of the clearance
  infrastructure and caregiver delegation, which attack the failing stages directly.

## How the pillars map to outcomes

Every pillar moves a leading metric that rolls into **Session-to-Purchase (2.04% today —
the product north star)**, which, multiplied by Sessions and AOV, is **Revenue (the business
outcome)**. Clinical-clearance infrastructure and the caregiver architecture attack the two
failing stages — the highest-leverage gap. Symptom-led discovery and private referral feed
higher-quality traffic. The retention layer protects LTV. Strategy, roadmap, and prototype
are one line: the prototype (F-D + F-G) is the clearance infrastructure made concrete, and
the clearance infrastructure is the thesis made buildable.
