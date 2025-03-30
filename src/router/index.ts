import { createRouter, createWebHistory } from "vue-router";
import Projects from "../pages/Projects.vue"; // ✅ Change "@/" to "../"
import About from "../pages/About.vue";
import Gordath from "../pages/Gordath.vue";

const routes = [
    {path: "/shop", component: Projects, name: "Shop" },
    {path: "/home", component: About, name: "Home"},
    {path: "/gordath", component: Gordath, name: "Gordath"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
