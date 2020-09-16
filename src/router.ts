import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "*",
        component: () => import("@/views/404.vue")
    },

    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue")
    },

    {
        path: "/projects",
        name: "Projects",
        component: () => import("@/views/Projects.vue")
    },

    {
        path: "/projects/:id",
        redirect: "/projects/:id/overview"
    },

    {
        path: "/projects/:id/:tab?",
        name: "Project",
        component: () => import("@/views/projects/Project.vue"),
        props: true
    },

    {
        path: "/search",
        name: "Search",
        component: () => import("@/views/Search.vue")
    },

    {
        path: "/tags",
        name: "Tags",
        component: () => import("@/views/Tags.vue")
    }
];

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes
});

export default router;
