<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ViewSelect from "./components/ViewSelect.vue";
const route = useRoute();

const activeKey = computed(() => String(route.params.key ?? "C"));
const activeType = computed(() => String(route.params.type ?? "major"));

const activeTypeLabel = computed(
  () => types.find((t) => t.value === activeType.value)?.label ?? activeType.value,
);

const keys = [
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
];

const types = [
  { value: "major", label: "majeur" },
  { value: "harmonic minor", label: "mineur harmonique" },
  { value: "diminished", label: "diminué" },
  { value: "augmented", label: "augmenté" },
];
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div>
        <RouterLink class="brand" :to="{ name: 'tone' }">
          Harmony&nbsp;Tool
        </RouterLink>
        <ViewSelect />
      </div>
      <nav class="chips chips--types" aria-label="Type de mode">
        <RouterLink
          v-for="type in types"
          :key="type.value"
          class="chip"
          :class="{ 'chip--active': type.value === activeType }"
          :to="{ name: 'tone', params: { key: activeKey, type: type.value } }"
        >
          {{ type.label }}
        </RouterLink>
      </nav>
    </header>

    <main class="main">
      <section class="hero">
        <h1 class="hero__tonic">{{ activeKey }}</h1>
        <p class="hero__type">{{ activeTypeLabel }}</p>
      </section>

      <nav class="chips chips--keys" aria-label="Tonalité">
        <RouterLink
          v-for="key in keys"
          :key="key"
          class="chip"
          :class="{ 'chip--active': key === activeKey }"
          :to="{ name: 'tone', params: { key, type: activeType } }"
        >
          {{ key }}
        </RouterLink>
      </nav>

      <section class="content">
        <RouterView />
      </section>
    </main>

    <footer class="footer">
      <p>
        Construit avec <span class="footer__heart">♥</span> par
        <a
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/websylvain/"
          >Sylvain Pastor</a
        > ·
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/syl-p/harmony-tool"
          >Code sur GitHub</a
        >.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  flex-wrap: wrap;
}

.brand {
  font-size: 0.85rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-mute);
  font-weight: 600;
  text-decoration: none;
}

.brand:hover {
  color: var(--text);
}

.main {
  flex: 1;
}

.hero {
  text-align: center;
  padding: 1rem 0 0.25rem;
}

.hero__tonic {
  font-size: clamp(4rem, 16vw, 9rem);
  line-height: 1;
  color: var(--accent);
  font-weight: 700;
}

.hero__type {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--text-mute);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.chips--keys {
  padding-top: 0.25rem;
  padding-bottom: 1.5rem;
}

.chip {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-mute);
  background: var(--bg-mute);
  font-size: 0.95rem;
  transition:
    border-color 0.2s,
    color 0.2s;
  text-decoration: none;
}

.chip:hover {
  border-color: var(--border-hover);
  color: var(--text);
}

.chip--active {
  background: var(--accent);
  border-color: var(--accent);
  color: #06120d;
  font-weight: 600;
}

.chips--types .chip {
  text-transform: capitalize;
}

.content {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 0 2rem;
}

.footer {
  text-align: center;
  padding: 1.5rem 0;
  color: var(--text-mute);
  font-size: 0.85rem;
}

.footer__heart {
  color: var(--diminished);
}

.footer a {
  color: var(--accent);
  text-decoration: none;
}
</style>
