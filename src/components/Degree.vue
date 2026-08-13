<script lang="ts" setup>
import { computed } from "vue";
import { Chord, Scale } from "tonal";
import * as Tone from "tone";
import TonePlayer from "../utils/TonePlayer";
import { chordQuality, romanNumeral } from "../utils/notation";
import useView from "@/composables/useView";

const { view } = useView();
const chordIdx = new Set([0, 2, 4, 6]);
const props = defineProps<{ mode: [string, string]; index: number }>();

const struct = computed(() => {
  const [tonic, modeName] = props.mode;
  const scale = Scale.get(`${tonic} ${modeName}`);
  const n = scale.notes.length;
  const chordNotes = [0, 2, 4, 6].map((s) => scale.notes[s % n]);
  const chord = Chord.detect(chordNotes)[0] ?? "";

  return {
    tonic,
    modeName,
    scale,
    chordNotes,
    chord,
    quality: chordQuality(chord),
  };
});

const roman = computed(() => romanNumeral(props.index + 1));

const isChordView = computed(() => view.value === "chords");

const title = computed(() => {
  if (isChordView.value) return struct.value.chord;
  return `${struct.value.tonic} ${struct.value.modeName}`;
});

async function playSound() {
  await Tone.start();
  const player = new TonePlayer();

  if (isChordView.value) {
    player.play_chord(struct.value.chordNotes);
  } else {
    player.play_note_by_note(struct.value.scale.notes);
  }
}
</script>

<template>
  <article class="degree" :class="`degree--${struct.quality}`">
    <div class="degree__num">{{ roman }}</div>

    <div class="degree__head">
      <h2
        class="degree__title"
        :class="{ 'degree__title--chord': isChordView }"
      >
        {{ title }}
      </h2>
    </div>

    <ul class="degree__notes">
      <li
        v-for="(note, i) in struct.scale.notes"
        :key="note"
        :class="{
          'degree__note--tonic': i === 0 && !isChordView,
          'degree__note--chord': isChordView && chordIdx.has(i),
          'degree__note--ghost': isChordView && !chordIdx.has(i),
        }"
      >
        {{ note }}
      </li>
    </ul>

    <button
      class="degree__play"
      :class="{ 'degree__play--chord': isChordView }"
      type="button"
      :aria-label="
        isChordView
          ? `Jouer l'accord ${struct.chord}`
          : `Jouer le mode ${struct.modeName}`
      "
      @click="playSound"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
        />
      </svg>
      {{ isChordView ? "Écouter l’accord" : "Écouter le mode" }}
    </button>
  </article>
</template>

<style scoped>
.degree {
  --q: var(--text-mute);
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 0.5rem 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-soft);
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.degree:hover {
  border-color: var(--q);
  transform: translateY(-1px);
}

.degree--major {
  --q: var(--major);
}
.degree--dominant {
  --q: var(--dominant);
}
.degree--minor {
  --q: var(--minor);
}
.degree--diminished {
  --q: var(--diminished);
}
.degree--augmented {
  --q: var(--augmented);
}
.degree--other {
  --q: var(--text-mute);
}

.degree__num {
  grid-row: 1 / 3;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--q);
  line-height: 1;
  text-align: center;
}

.degree__head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.degree__title {
  font-size: 1.3rem;
  color: var(--q);
  text-transform: capitalize;
}

.degree__title--chord {
  font-weight: 700;
}

.degree__notes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.degree__notes li {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-mute);
  font-size: 0.85rem;
}

.degree__notes li.degree__note--tonic {
  border-color: var(--q);
  color: var(--q);
  font-weight: 600;
}

.degree__notes li.degree__note--chord {
  border-color: var(--q);
  color: var(--q);
  background: color-mix(in srgb, var(--q) 14%, transparent);
  font-weight: 600;
}

.degree__notes li.degree__note--ghost {
  opacity: 0.35;
}

.degree__play--chord {
  color: var(--minor);
}

.degree__play--chord:hover {
  background: var(--minor);
  border-color: var(--minor);
}

.degree__play {
  grid-column: 2 / 4;
  justify-self: start;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--q);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.degree__play:hover {
  background: var(--q);
  border-color: var(--q);
  color: #06120d;
}

.degree__play svg {
  width: 1.1rem;
  height: 1.1rem;
}

@media (max-width: 640px) {
  .degree {
    grid-template-columns: 2.5rem 1fr;
  }

  .degree__play {
    grid-column: 2;
  }
}
</style>
