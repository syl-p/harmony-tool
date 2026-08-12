const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

export function romanNumeral(index: number): string {
  return ROMAN[(index - 1) % ROMAN.length] ?? String(index);
}

export type ChordQuality =
  "major" | "dominant" | "minor" | "diminished" | "augmented" | "other";

export function chordQuality(chordName: string): ChordQuality {
  if (!chordName) return "other";
  const suffix = chordName.replace(/^[A-G](?:#|b|##|bb)?/i, "").toLowerCase();
  if (suffix.includes("sus")) return "other";
  if (suffix.includes("m7b5") || suffix.includes("ø") || suffix.includes("dim"))
    return "diminished";
  if (suffix.includes("aug") || suffix.includes("+")) return "augmented";
  if (suffix.includes("maj") || suffix.includes("Δ")) return "major";
  if (suffix.startsWith("m")) return "minor";
  if (suffix === "" || suffix === "6" || suffix === "69") return "major";
  if (suffix.includes("7") || /^\d/.test(suffix)) return "dominant";
  return "other";
}
