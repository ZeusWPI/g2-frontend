import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "*",
        component: () => import("../views/404.vue")
    },

    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },

    {
        path: "/projects",
        name: "Projects",
        component: () => import("../views/Projects.vue")
    },

    {
        path: "/projects/:id",
        redirect: "/projects/:id/overview"
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
