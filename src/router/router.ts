import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/projects",
        name: "Projects",
        component: () => import("../views/Projects.vue")
    },

    {
        path: "/projects/:id",
        redirect: "/projects/:id/issues"
    },

    {
        path: "/projects/:id/:tab?",
        name: "Project",
        component: () => import("../views/projects/Project.vue"),
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
