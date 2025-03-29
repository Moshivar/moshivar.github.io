import { createRouter, createWebHistory } from "vue-router";
import Projects from "../views/Projects.vue"; // ✅ Change "@/" to "../"
import About from "../views/About.vue";
import Gordath from "../views/Gordath.vue";

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
