<template>
    <v-navigation-drawer v-model="_drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item v-for="(link, index) in links" :key="index" :to="link.to">
                <!-- Icon -->
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <!-- Text -->
                <v-list-item-content>
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";

@Component
export default class NavigationDrawer extends Vue {
    /**
     * Should the drawer be open.
     */
    @PropSync("drawer")
    _drawer: boolean;

    /**
     * Links to display inside the navigation bar
     */
    @Prop()
    links: Array<NavigationLink>;
}
</script>
