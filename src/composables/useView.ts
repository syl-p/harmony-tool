import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export type View = "scale" | "chord";

export default function useView() {
  const route = useRoute();
  const router = useRouter();

  const view = computed<View>({
    get: () => (route.query.view === "chord" ? "chord" : "scale"),
    set: (value) => router.push({ query: { view: value } }),
  });

  return { view };
}
