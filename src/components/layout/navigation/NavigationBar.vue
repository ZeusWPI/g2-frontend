<template>
    <v-toolbar class="navbar" color="primary" dark fixed>
        <!-- Open drawer icon -->
        <v-app-bar-nav-icon
            class="hidden-md-and-up"
            @click.stop="toggleDrawer"
        />

        <!-- Title -->
        <v-toolbar-title class="navbar__title" @click="$router.push('/')">
            <span>G2</span>
        </v-toolbar-title>

        <v-spacer />

        <!-- Items -->
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn
                v-for="(link, index) in links"
                :key="index"
                :to="link.to"
                exact
                text
            >
                {{ link.text }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";

@Component
export default class NavigationBar extends Vue {
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

    /**
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer(): void {
        this._drawer = !this._drawer;
    }
}
</script>

<style lang="scss">
.navbar {
    z-index: 100;

    &__title {
        cursor: pointer;
        padding: 10px;
        font-size: 1.2rem;
        width: 210px;
        color: white;

        img {
            max-height: 30px;
            margin-right: 15px;
            float: left;
        }
    }
}
</style>
