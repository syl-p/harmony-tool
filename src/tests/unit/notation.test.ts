import { expect, test } from "vitest";
import { chordQuality } from "../../utils/notation";

test("major chords", () => {
  expect(chordQuality("Cmaj7")).toBe("major");
  expect(chordQuality("C")).toBe("major");
  expect(chordQuality("F6")).toBe("major");
});

test("dominant chords", () => {
  expect(chordQuality("C7")).toBe("dominant");
  expect(chordQuality("D9")).toBe("dominant");
});

test("minor chords", () => {
  expect(chordQuality("Dm7")).toBe("minor");
  expect(chordQuality("Am")).toBe("minor");
});

test("diminished chords", () => {
  expect(chordQuality("F#m7b5")).toBe("diminished");
  expect(chordQuality("Cdim7")).toBe("diminished");
});

test("augmented chords", () => {
  expect(chordQuality("Caug")).toBe("augmented");
  expect(chordQuality("Ca+")).toBe("augmented");
});

test("other chords", () => {
  expect(chordQuality("Csus4")).toBe("other");
});

test("empty chord", () => {
  expect(chordQuality("")).toBe("other");
});
