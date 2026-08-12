<script lang="ts" setup>
const qualities = [
  { name: "Accord majeur", color: "var(--major)", degrees: "degrés I, IV" },
  {
    name: "Accord mineur",
    color: "var(--minor)",
    degrees: "degrés II, III, VI",
  },
  { name: "Accord de dominante", color: "var(--dominant)", degrees: "degré V" },
  {
    name: "Accord diminué",
    color: "var(--diminished)",
    degrees: "degré VII (m7♭5)",
  },
  {
    name: "Accord augmenté",
    color: "var(--augmented)",
    degrees: "rare en gamme majeure",
  },
];
</script>

<template>
  <section class="legend">
    <h3 class="legend__title">Comprendre l'app</h3>

    <p class="legend__intro">
      Chaque carte représente un degré de la gamme (I à VII) : la couleur de son
      numéro romain et de son titre correspond à la qualité de l'accord
      construit sur ce degré. Les pastilles listent les notes de la gamme, la
      fondamentale étant surlignée.
    </p>

    <ul class="legend__qualities">
      <li v-for="q in qualities" :key="q.name" class="legend__quality">
        <span class="legend__swatch" :style="{ background: q.color }"></span>
        <strong class="legend__name">{{ q.name }}</strong>
        <span class="legend__degrees">{{ q.degrees }}</span>
      </li>
    </ul>

    <div class="legend__views">
      <p>
        <strong>Scale</strong>: écoute la gamme note par note et met la
        fondamentale en avant.
      </p>
      <p>
        <strong>Chords</strong>: écoute l'accord (les 4 notes du degré sont
        surlignées, les autres estompées).
      </p>
    </div>
  </section>
</template>

<style scoped>
.legend {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-top: 2.5rem;
  color: var(--text-mute);
  font-size: 0.9rem;
}

.legend__title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.legend__intro {
  max-width: 65ch;
  margin-bottom: 1.25rem;
}

.legend__qualities {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.legend__quality {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-soft);
}

.legend__swatch {
  flex-shrink: 0;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
}

.legend__name {
  color: var(--text);
  font-weight: 600;
  font-size: 0.85rem;
}

.legend__degrees {
  margin-left: auto;
}

.legend__views {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
}

.legend__views p {
  margin: 0;
  max-width: 40ch;
}

.legend__views strong {
  color: var(--text);
}
</style>
