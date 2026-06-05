# DESIGN_NOTES.md — Everhope visual language

Tokens extracted from the **rendered** live site (store.everhope.care) on 2026-06-06 by
fetching the homepage, a PDP, and a collection page, plus reading the theme's CSS custom
properties out of the raw HTML. Nothing is imported from Shopify — these are reproduced as
Tailwind tokens in `/PROTOTYPE`.

## Source pages inspected
- `https://store.everhope.care/` (home)
- `https://store.everhope.care/products/autoimmunity-care-digest-all-care-30-capsules` (PDP)
- `https://store.everhope.care/collections/energy-weight-support` (collection)

## Colour palette (hex)
Pulled from theme CSS vars (`--text-color: 28 28 28`, `--button-text-color: 215 41 80`,
`--star-color`, `--border-color`) and the most frequent hex codes in the HTML.

| Token            | Hex       | Source / use |
|------------------|-----------|--------------|
| `ink`            | `#1C1C1C` | `--text-color: 28 28 28` — body + headings |
| `ink-muted`      | `#6B6B6B` | secondary text |
| `brand` (crimson)| `#D72950` | `--button-text-color: 215 41 80` — primary CTA, links, brand accent |
| `brand-dark`     | `#B91F44` | hover/active on crimson |
| `safe` (green)   | `#1F9D57` | derived from `#27AE60` in HTML — "Cleared for you" safety badge |
| `safe-tint`      | `#E8F6EE` | safe badge / cleared-card background |
| `warn`           | `#C0392B` | `#c0392b` in HTML — "filtered out / not safe" |
| `star`           | `#F5A623` | `#f5a623` (most frequent hex) — rating stars |
| `teal`           | `#3D6465` | `#3d6465` / `#61adaf` — clinical/medical secondary accent |
| `teal-tint`      | `#EAF1F1` | clinical info panels (safety sheet) |
| `cream`          | `#FBF6F4` | warm off-white section background |
| `border`         | `#E5DDDA` | `--border-color: 218 202 199` — warm hairline borders |
| `surface`        | `#FFFFFF` | cards, header |

Note: the brand reads as **clinical-but-warm** — crimson as the single strong accent on a
white/cream field, green reserved for safety affordances, teal for the doctor-facing layer.

## Typography
- **Family:** `"Libre Franklin"` (Google Fonts) for everything — the only `@font-face`
  family declared. Fallback `ui-sans-serif, system-ui, sans-serif`.
- **Weights in use:** 400 (body), 500 (labels/nav), 600 (card titles, section headings),
  700 (hero / price / H1).
- **Scale:** H1 ~36–44px, H2 ~24–28px, card title ~16–18px/600, body 15–16px/400,
  small/meta 13px. Generous line-height (~1.5 body, ~1.2 headings).
- Section eyebrows and certification labels are uppercase, letter-spaced, small (12–13px/600).

## Spacing, rounding, elevation
- Rounding: cards and buttons ~`10–12px` (`rounded-xl`); pills/badges fully rounded.
- Borders: 1px warm hairline (`#E5DDDA`); cards use border + very soft shadow, not heavy.
- Layout: max content width ~1200px, comfortable white space, 3-column product grid on
  desktop (collapses to 1 on mobile).

## Buttons
- **Primary:** solid crimson `#D72950`, white text, `rounded-xl`, weight 600, uppercase or
  sentence case ("ADD TO CART", "BUY NOW AT ₹1,099"). Hover → `#B91F44`.
- **Secondary/outline:** white bg, crimson text, 1px crimson border (theme exposes a
  crimson `--button-text-color` scheme).
- **Quiet/link:** crimson text, no fill.

## Product card pattern (composited from home + collection)
Top→bottom: image (square, soft rounding) → star rating (e.g. `4.5 ★`) → small category/
symptom label → product title (linked) → price row showing **discounted ₹ + struck-through
MRP + "X% Off"**. CTA "Add to Cart". On home, cards also carry a category eyebrow
("Energy & Weight Support") and badges like "Oncology Nutritionist Reviewed".

## PDP layout (from the Autoimmunity Care PDP)
- Title → price block with **Pack of 1 / 2 / 3** options and % savings → certifications row.
- Section order: **Description → Safety & Tolerance → Suggested Use → FAQ → Reviews & Rating.**
- **Safety & Tolerance** has three sub-blocks that we reuse verbatim as structure:
  "What to be aware of", "If you have known allergies", "Things to consider before use".
- Allergen line style: "Free from lactose, gluten, and soy."
- "Avoid if:" line style: "Known allergy to any digestive enzyme | Caution in acute pancreatitis".
- CTAs: "ADD TO CART" + "BUY NOW AT ₹1,099", quantity selector.

## Trust elements to reproduce
Certification row: **GMP · HACCP · FSSAI · FDA Registered · ISO**, plus "Lactose/Gluten/Soy
Free" chips, **4.x ★** ratings, "Oncology Nutritionist Reviewed", "Third Party Tested",
"1 Lakh+ Patients Treated". These are the existing trust scaffolding our two safety features
plug into.

## Navigation
Home · Browse Products (/collections/all) · Ask Expert · About Us · Search · Cart.
Collections: Energy & Weight, Gut & Immune, Inflammation & Pain, Sleep/Nerve & Metabolism,
Blood & Liver. The prototype mirrors this top-nav plus two new entry points (avoid-list
upload, doctor-review) for the demo flow.

## Voice
Compassionate-clinical: "You don't have to navigate cancer alone", "Recommended by Experts",
"Nutrition that makes a difference". Never alarmist, never absolute medical claims — which is
exactly the register the two safety features must keep.
