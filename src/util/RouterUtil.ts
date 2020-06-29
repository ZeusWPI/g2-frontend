import Vue from "vue";
import { VueRouter } from "vue-router/types/router";

export class RouterUtil {
    /**
     * Reload the current route.
     * @param router Instance of the current Vue router
     */
    static async reload(router: VueRouter) {
        const location = router.currentRoute.path;

        // Go to a page for a quick second.
        await router.replace("/#");

        // Go back to the current page.
        Vue.nextTick(() => {
            router.push(location);
        });
    }
}
