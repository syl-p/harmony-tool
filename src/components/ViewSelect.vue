<template>
  <select v-model="view" aria-label="Mode de lecture">
    <option value="modes">Modes</option>
    <option value="chords">Accords</option>
  </select>
</template>

<script lang="ts" setup>
import useView from "@/composables/useView";
const { view } = useView();
</script>

<style scoped>
select {
  appearance: none;
  background: var(--bg-mute);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 999px;
  padding: 0.4rem 2rem 0.4rem 0.9rem;
  font-size: 0.95rem;
  cursor: pointer;
  color-scheme: dark;
  transition:
    border-color 0.2s,
    color 0.2s;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%239a9aa6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
}

select:hover {
  border-color: var(--border-hover);
}
</style>
