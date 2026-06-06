// Mock catalog — 7 realistic Everhope-style SKUs spanning the store's symptom collections
// (energy/weight, gut/immune, inflammation/pain, nerve/sleep). Prices in ₹.
// Front-end only: there is no API; this array IS the "database".
//
// Safety-filter design note: at least 3 SKUs intentionally contain ingredients a sample
// oncologist avoid-list catches, so Feature A visibly removes products:
//   - soy            -> Energy Restore Plant Protein   (allergen)
//   - curcumin       -> InflaEase Curcumin Complex     (free-text avoid)
//   - fish + vit E   -> OmegaCalm Fish Oil + Vitamin E (allergen + uncertain-dose avoid)
//   - green tea/EGCG -> NerveCalm Magnesium + Theanine (free-text avoid)
// The other 3 are clean and stay "Cleared for you".

export const CATEGORIES = {
  energy: { label: "Energy & Weight Support", tint: "#FFF4E6", ink: "#B5651D" },
  gut: { label: "Gut & Immune Care", tint: "#EAF1F1", ink: "#3D6465" },
  inflammation: { label: "Inflammation & Pain", tint: "#FBEAE8", ink: "#B91F44" },
  nerve: { label: "Sleep, Nerve & Metabolism", tint: "#EEEBFA", ink: "#5B4B9E" },
};

const CERTS = ["GMP", "HACCP", "FSSAI", "FDA Registered", "ISO"];

export const PRODUCTS = [
  {
    id: "energy-restore-protein",
    slug: "energy-restore-plant-protein",
    name: "Energy Restore Plant Protein (300 g)",
    brand: "Everhope Oncology",
    category: "energy",
    price: 1440,
    mrp: 1799,
    rating: 4.5,
    reviews: 212,
    image: { key: "energy", initials: "ER" },
    short:
      "High-absorption plant protein to rebuild strength and hold weight through treatment.",
    description:
      "A gentle, lactose-free plant protein built for appetite loss and muscle wasting during chemotherapy. 24 g protein per serving with added MCT for easy energy.",
    ingredients: [
      "Pea protein isolate",
      "Brown rice protein",
      "Soy lecithin (emulsifier)",
      "MCT powder",
      "Cocoa",
      "Stevia leaf extract",
    ],
    allergens: ["Soy"],
    safety_and_tolerance: {
      aware:
        "Some people notice mild bloating in the first few days as the gut adjusts to the protein load. Sip slowly and split servings if needed.",
      allergies:
        "Contains soy (as lecithin). Stop use and speak to your care team if you notice any allergic reaction.",
      consider:
        "If you are on a potassium- or protein-restricted renal diet, confirm the serving size with your oncologist or dietitian first.",
    },
    avoid_if: ["Known soy allergy", "Active protein-restricted renal diet (confirm first)"],
    suggested_use:
      "Mix 1 scoop (30 g) into 200 ml water or milk, once or twice daily, or as directed by your healthcare provider.",
    interaction_notes: [
      "No known direct chemotherapy interactions; primarily a nutrition support, not an active botanical.",
    ],
    certifications: CERTS,
    tags: ["lactose-free", "high-protein"],
  },
  {
    id: "vitab-energy-complex",
    slug: "vitab-energy-complex",
    name: "VitaB Energy Complex (60 Capsules)",
    brand: "Everhope Oncology",
    category: "energy",
    price: 1499,
    mrp: 1645,
    rating: 4.4,
    reviews: 168,
    image: { key: "energy", initials: "VB" },
    short:
      "A full B-complex to support energy metabolism and fight treatment-related fatigue.",
    description:
      "Methylated, well-tolerated B vitamins (including active folate and B12) to support red blood cell formation and reduce day-to-day fatigue during treatment.",
    ingredients: [
      "Vitamin B1 (Thiamine)",
      "Vitamin B2 (Riboflavin)",
      "Vitamin B3 (Niacinamide)",
      "Vitamin B6 (P-5-P)",
      "Folate (5-MTHF)",
      "Vitamin B12 (Methylcobalamin)",
      "Biotin",
    ],
    allergens: [],
    safety_and_tolerance: {
      aware:
        "Riboflavin can turn urine bright yellow — this is harmless and expected.",
      allergies: "Free from gluten, soy, dairy and added colours.",
      consider:
        "If you are receiving certain folate-pathway chemotherapies, your team may want to time folate intake — mention it at your next visit.",
    },
    avoid_if: ["Advised to restrict supplemental folate around specific chemo cycles"],
    suggested_use: "Take 1 capsule daily with food, or as directed by your healthcare provider.",
    interaction_notes: [
      "Folate timing may matter with antifolate chemotherapies (e.g. methotrexate, pemetrexed) — your oncologist can advise on timing.",
    ],
    certifications: CERTS,
    tags: ["gluten-free", "soy-free", "dairy-free"],
  },
  {
    id: "gutcalm-enzyme-probiotic",
    slug: "gutcalm-digestive-enzyme-probiotic",
    name: "GutCalm Digestive Enzyme + Probiotic (30 Capsules)",
    brand: "Everhope Oncology",
    category: "gut",
    price: 1099,
    mrp: 1201,
    rating: 4.2,
    reviews: 143,
    image: { key: "gut", initials: "GC" },
    short:
      "A 16-enzyme blend with a gentle probiotic to ease bloating, gas and irregular digestion.",
    description:
      "Plant-based digestive enzymes plus ox bile and ginger to help break down meals when appetite and digestion are disrupted, with a low-dose probiotic for regularity.",
    ingredients: [
      "16-ingredient plant enzyme blend",
      "Ox bile extract",
      "Ginger root extract",
      "Lactobacillus acidophilus",
    ],
    allergens: [],
    safety_and_tolerance: {
      aware:
        "You may notice temporary changes in digestion as your gut adjusts. This usually settles within a few days.",
      allergies: "Free from lactose, gluten and soy.",
      consider:
        "If you are neutropenic (very low white-cell count), confirm probiotic use with your oncologist before starting.",
    },
    avoid_if: ["Acute pancreatitis (use with caution)", "Severe neutropenia (confirm first)"],
    suggested_use:
      "Take 1 capsule with or before your main meal, once daily, or as directed by your healthcare provider.",
    interaction_notes: [
      "Live probiotics warrant a quick check if you are significantly immunosuppressed or neutropenic.",
    ],
    certifications: CERTS,
    tags: ["lactose-free", "gluten-free", "soy-free"],
  },
  {
    id: "immunoguard-betaglucan-zinc",
    slug: "immunoguard-beta-glucan-zinc",
    name: "ImmunoGuard Beta-Glucan + Zinc (60 Capsules)",
    brand: "Everhope Oncology",
    category: "gut",
    price: 1320,
    mrp: 1650,
    rating: 4.6,
    reviews: 197,
    image: { key: "gut", initials: "IG" },
    short:
      "Beta-1,3/1,6-glucan with zinc and selenium to support everyday immune resilience.",
    description:
      "A non-stimulating immune-support formula using purified beta-glucan with zinc, selenium and vitamin C — chosen to avoid the immune-overstimulation concerns of stronger herbal immunomodulators.",
    ingredients: [
      "Beta-1,3/1,6-glucan (yeast-derived, purified)",
      "Zinc (citrate)",
      "Selenium (selenomethionine)",
      "Vitamin C (ascorbic acid)",
    ],
    allergens: [],
    safety_and_tolerance: {
      aware: "Generally very well tolerated; take with food if you have a sensitive stomach.",
      allergies: "Free from gluten, soy and dairy.",
      consider:
        "Zinc and selenium have upper limits — avoid stacking with other high-dose mineral supplements without checking your total intake.",
    },
    avoid_if: ["Already taking high-dose zinc or selenium from another product"],
    suggested_use: "Take 1 capsule daily with food, or as directed by your healthcare provider.",
    interaction_notes: [
      "No strong herbal immunomodulators; chosen specifically to be gentle alongside active treatment.",
    ],
    certifications: CERTS,
    tags: ["gluten-free", "soy-free", "dairy-free"],
  },
  {
    id: "inflaease-curcumin",
    slug: "inflaease-curcumin-complex",
    name: "InflaEase Curcumin Complex (60 Capsules)",
    brand: "Everhope Oncology",
    category: "inflammation",
    price: 1424,
    mrp: 1779,
    rating: 4.3,
    reviews: 256,
    image: { key: "inflammation", initials: "IE" },
    short:
      "High-absorption curcumin with ginger to ease treatment-related aches and stiffness.",
    description:
      "A bioavailable curcumin (turmeric) extract with piperine and ginger, traditionally used to support comfort and mobility. Potent botanical — best cleared with your oncologist first.",
    ingredients: [
      "Curcumin (Turmeric extract, 95% curcuminoids)",
      "Piperine (Black pepper extract)",
      "Ginger root extract",
    ],
    allergens: [],
    safety_and_tolerance: {
      aware:
        "Take with food. Some people notice mild reflux at higher doses — reduce the dose if so.",
      allergies: "Free from gluten, soy and dairy.",
      consider:
        "Curcumin and piperine can affect how the liver processes some drugs, and curcumin may add to the effect of blood thinners.",
    },
    avoid_if: [
      "Taking anticoagulants / antiplatelets (e.g. warfarin)",
      "Within 2 weeks of surgery or a procedure",
      "On a drug with a narrow therapeutic window (clear timing first)",
    ],
    suggested_use:
      "Take 1 capsule daily with food, or as directed by your healthcare provider.",
    interaction_notes: [
      "May increase bleeding risk alongside anticoagulants/antiplatelets.",
      "Piperine inhibits CYP3A4/P-gp and can raise levels of some chemotherapies and drugs.",
      "Pause before surgery or invasive procedures.",
    ],
    certifications: CERTS,
    tags: ["botanical", "anticoagulant-interaction", "cyp3a4"],
  },
  {
    id: "omegacalm-fishoil-vite",
    slug: "omegacalm-fish-oil-vitamin-e",
    name: "OmegaCalm Fish Oil + Vitamin E (90 Softgels)",
    brand: "Everhope Oncology",
    category: "inflammation",
    price: 1199,
    mrp: 1499,
    rating: 4.1,
    reviews: 121,
    image: { key: "inflammation", initials: "OC" },
    short:
      "Concentrated EPA/DHA omega-3 with vitamin E to support comfort and lean mass.",
    description:
      "A high-EPA fish oil to support an anti-inflammatory balance and help preserve lean mass, stabilised with mixed tocopherols (vitamin E).",
    ingredients: [
      "Fish oil concentrate (EPA 600 mg / DHA 300 mg)",
      "Mixed tocopherols (Vitamin E)",
    ],
    allergens: ["Fish"],
    safety_and_tolerance: {
      aware:
        "Take with meals to avoid fishy aftertaste or reflux. A light fishy burp is common and harmless.",
      allergies: "Contains fish. Avoid if you have a fish allergy.",
      consider:
        "High-dose omega-3 and vitamin E can both nudge bleeding risk, especially alongside anticoagulants.",
    },
    avoid_if: [
      "Known fish allergy",
      "Taking anticoagulants / antiplatelets",
      "Advised to cap vitamin E intake",
    ],
    suggested_use:
      "Take 1 softgel daily with a meal, or as directed by your healthcare provider.",
    interaction_notes: [
      "May add to the bleeding-risk of anticoagulants/antiplatelets at higher doses.",
      "Vitamin E amount is a single combined figure on the label — confirm it fits any cap your team has set.",
    ],
    certifications: CERTS,
    tags: ["contains-fish", "anticoagulant-interaction"],
  },
  {
    id: "nervecalm-mag-theanine",
    slug: "nervecalm-magnesium-l-theanine",
    name: "NerveCalm Magnesium + L-Theanine (60 Capsules)",
    brand: "Everhope Oncology",
    category: "nerve",
    price: 999,
    mrp: 1249,
    rating: 4.5,
    reviews: 188,
    image: { key: "nerve", initials: "NC" },
    short:
      "Magnesium glycinate with L-theanine to calm the mind and support restful sleep.",
    description:
      "Gentle, well-absorbed magnesium glycinate paired with L-theanine (from green tea) to ease tension and support sleep without next-day grogginess.",
    ingredients: [
      "Magnesium (as bisglycinate)",
      "L-Theanine (from green tea / Camellia sinensis)",
      "Green tea extract (standardised EGCG)",
    ],
    allergens: [],
    safety_and_tolerance: {
      aware:
        "Magnesium can loosen stools at higher doses — reduce the dose if that happens.",
      allergies: "Free from gluten, soy and dairy.",
      consider:
        "Green tea catechins (EGCG) can interact with some treatments and may affect iron absorption — worth clearing with your team.",
    },
    avoid_if: [
      "Advised to avoid green tea / EGCG extracts during treatment",
      "Significant kidney impairment (magnesium clearance)",
    ],
    suggested_use:
      "Take 1 capsule about an hour before bed, or as directed by your healthcare provider.",
    interaction_notes: [
      "EGCG (green tea) has been reported to interact with bortezomib and affect CYP enzymes — clear timing with your oncologist.",
      "Catechins can reduce non-heme iron absorption; separate from iron supplements.",
    ],
    certifications: CERTS,
    tags: ["botanical", "egcg", "cyp-interaction"],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const discountPct = (price, mrp) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

export const formatRupees = (n) => `₹${n.toLocaleString("en-IN")}`;
