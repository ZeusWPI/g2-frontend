<template>
    <div>
        <!-- Toolbar (TOP) -->
        <navigation-bar :drawer.sync="drawer" :links="links" />

        <!-- Drawer (SMALL SCREENS) -->
        <navigation-drawer :drawer.sync="drawer" :links="links" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";
import NavigationBar from "@/components/layout/navigation/NavigationBar.vue";
import NavigationDrawer from "@/components/layout/navigation/NavigationDrawer.vue";

@Component({
    components: { NavigationDrawer, NavigationBar }
})
export default class Navigation extends Vue {
    /**
     * Should the drawer be open.
     */
    drawer = false;

    /**
     * Links to display inside the navigation bar
     */
    get links(): Array<NavigationLink> {
        return [
            {
                text: this.t("navigation.home"),
                to: "/",
                icon: "mdi-home"
            },

            {
                text: this.t("navigation.projects"),
                to: "/projects",
                icon: "mdi-format-list-bulleted-type"
            },

            {
                text: this.t("navigation.search"),
                to: "/search",
                icon: "mdi-magnify"
            }
        ];
    }
}
</script>
