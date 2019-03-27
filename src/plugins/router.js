import Vue from "vue";
import VueRouter from "vue-router";
import Config from "../config";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: Config.routes
});

export default router;