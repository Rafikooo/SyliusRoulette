import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(window.__BASE_URL__),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    }
  ],
});

export default router;
