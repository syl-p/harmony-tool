import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/:key?/:type?",
    name: "tone",
    component: () => import("./views/ToneView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
