import { expect, test } from "vitest";
import TonePlayer from "../../utils/TonePlayer";

test("test getPlayables", () => {
  const tonePlayer = new TonePlayer();
  const result = tonePlayer.getOctaveNumber("G", "D", 4);
  expect(result == 5);
});
