import { createRouter, createWebHistory } from "vue-router";
import Shop from "../views/Shop.vue"; // ✅ Change "@/" to "../"
import Home from "../views/Home.vue";
import Gordath from "../views/Gordath.vue";

const routes = [
    {path: "/shop", component: Shop, name: "Shop" },
    {path: "/home", component: Home, name: "Home"},
    {path: "/gordath", component: Gordath, name: "Gordath"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
