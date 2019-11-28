<template>
    <v-layout>
        <!-- Toolbar (TOP) -->
        <v-toolbar color="primary" dark fixed>
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>G2</v-toolbar-title>

            <v-spacer />

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    v-for="(link, index) in links"
                    :key="index"
                    :to="link.to"
                    text
                    >{{ link.title }}</v-btn
                >
            </v-toolbar-items>
        </v-toolbar>

        <!-- Drawer (SIDE) -->
        <v-navigation-drawer v-model="drawer" temporary fixed>
            <v-list nav dense>
                <v-list-item
                    v-for="(link, index) in links"
                    :key="index"
                    :to="link.to"
                >
                    <!-- Icon -->
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>

                    <!-- Text -->
                    <v-list-item-content>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
export default {
    name: "Navigation",

    data: () => ({
        drawer: false,
        links: [
            {
                title: "Home",
                to: "/",
                icon: "home"
            },

            {
                title: "Projecten",
                to: "/projects",
                icon: "list"
            }
        ]
    })
};
</script>
