import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export type View = "modes" | "chords";

export default function useView() {
  const route = useRoute();
  const router = useRouter();

  const view = computed<View>({
    get: () => (route.query.view === "chords" ? "chords" : "modes"),
    set: (value) => router.push({ query: { view: value } }),
  });

  return { view };
}
