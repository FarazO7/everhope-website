// Feature A data + logic — the oncologist avoid/allergy list and the matcher that
// decides whether a product is "Cleared" or "Filtered for your safety".
//
// MVP layering required by the brief:
//   layer "allergen" -> the STRUCTURED layer (clean chips: Soy, Fish ...)
//   layer "avoid"    -> the doctor's FREE-TEXT avoid layer (Curcumin, Green tea, Vit E)
//
// Guardrail required by the brief: when we can't be sure a product is safe, we EXCLUDE it
// (err toward over-restriction). That is the `certainty: "uncertain"` path — it still
// filters the product out, but the UI explains *why* it wasn't certain.

// Canonical avoid tokens with synonyms so the "parser" catches real-world label wording
// (soy lecithin, Camellia sinensis, mixed tocopherols, etc.).
export const AVOID_TOKENS = [
  {
    key: "soy",
    label: "Soy",
    layer: "allergen",
    certainty: "certain",
    note: "Listed allergy",
    synonyms: ["soy", "soya", "soybean", "soy lecithin"],
  },
  {
    key: "fish",
    label: "Fish",
    layer: "allergen",
    certainty: "certain",
    note: "Listed allergy",
    synonyms: ["fish", "fish oil", "epa", "dha", "cod liver", "anchovy", "sardine"],
  },
  {
    key: "greentea",
    label: "Green tea / EGCG",
    layer: "avoid",
    certainty: "certain",
    note: "Oncologist note: avoid during treatment (CYP / drug interaction)",
    synonyms: [
      "green tea",
      "egcg",
      "camellia sinensis",
      "l-theanine",
      "tea extract",
      "tea polyphenol",
      "catechin",
    ],
  },
  {
    key: "curcumin",
    label: "Curcumin / Turmeric",
    layer: "avoid",
    certainty: "certain",
    note: "Oncologist note: avoid with anticoagulants; pause before procedures",
    synonyms: ["curcumin", "turmeric", "curcuma", "curcuminoid"],
  },
  {
    key: "vitamin_e",
    label: "High-dose Vitamin E (keep under 200 IU)",
    layer: "avoid",
    certainty: "uncertain",
    note: "Oncologist note: cap Vitamin E — exclude where the amount can't be confirmed",
    synonyms: ["vitamin e", "tocopherol", "tocopherols", "tocotrienol", "d-alpha"],
  },
];

// The "uploaded" PDF, post-OCR. This is what the upload modal shows for the patient to
// confirm BEFORE anything is applied (human-in-the-loop). Nothing here is auto-trusted.
export const SAMPLE_AVOID_LIST = {
  fileName: "Dr-Mehta_avoid-list_Priya-S.pdf",
  doctor: "Dr. A. Mehta, Medical Oncology",
  patient: "Priya S.",
  issued: "2026-05-28",
  tokenKeys: AVOID_TOKENS.map((t) => t.key),
};

const haystack = (product) =>
  [...product.ingredients, ...product.allergens].join(" | ").toLowerCase();

// Evaluate one product against the confirmed avoid tokens.
// Returns { status, matches } where status is "cleared" | "filtered".
// Any match (certain OR uncertain) filters the product out — over-restriction by design.
export function evaluateProduct(product, activeKeys) {
  if (!activeKeys || activeKeys.length === 0) {
    return { status: "cleared", matches: [], evaluated: false };
  }
  const text = haystack(product);
  const matches = [];

  for (const token of AVOID_TOKENS) {
    if (!activeKeys.includes(token.key)) continue;
    const hitSyn = token.synonyms.find((s) => text.includes(s));
    if (!hitSyn) continue;

    // Find the specific ingredient/allergen string that tripped it, for clear UI copy.
    const matchedOn =
      [...product.ingredients, ...product.allergens].find((i) =>
        i.toLowerCase().includes(hitSyn),
      ) || hitSyn;

    matches.push({
      key: token.key,
      label: token.label,
      layer: token.layer, // "allergen" (structured) or "avoid" (free-text)
      certainty: token.certainty, // "certain" | "uncertain"
      matchedOn,
      reason:
        token.certainty === "uncertain"
          ? `Couldn't confirm this stays within your limit — excluded to be safe.`
          : token.layer === "allergen"
            ? `On your allergy list.`
            : `On your oncologist's avoid list.`,
    });
  }

  return {
    status: matches.length > 0 ? "filtered" : "cleared",
    matches,
    evaluated: true,
  };
}

// Convenience: split the active tokens into the two labelled layers for the UI.
export const tokensByLayer = (activeKeys) => ({
  allergens: AVOID_TOKENS.filter(
    (t) => t.layer === "allergen" && activeKeys.includes(t.key),
  ),
  avoid: AVOID_TOKENS.filter((t) => t.layer === "avoid" && activeKeys.includes(t.key)),
});
