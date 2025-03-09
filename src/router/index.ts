import { createRouter, createWebHistory } from "vue-router";
import Shop from "../views/Shop.vue"; // ✅ Change "@/" to "../"
import Home from "../views/Home.vue";

const routes = [
    { path: "/shop", component: Shop, name: "Shop" },
    {path: "/home", component: Home, name: "Home"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
