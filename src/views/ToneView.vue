<script lang="ts" setup>
import { computed } from "vue";
import { Scale } from "tonal";
import { useRoute } from "vue-router";
import Degree from "../components/Degree.vue";
import Legend from "../components/Legend.vue";

const route = useRoute();

const key = computed(() => route.params.key || "C");
const type = computed(() => route.params.type || "major");

const modes = computed(() => Scale.modeNames(`${key.value} ${type.value}`));
</script>

<template>
  <ol class="degrees">
    <li v-for="(mode, index) in modes" :key="index">
      <Degree :mode="mode" :index="index" />
    </li>
  </ol>

  <Legend />
</template>

<style scoped>
.degrees {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
