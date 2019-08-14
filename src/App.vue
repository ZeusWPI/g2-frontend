<template>
    <v-app>
        <v-content>
            <!-- Navigation -->
            <Navigation />

            <!-- Content -->
            <v-container grid-list-md>
                <router-view />
            </v-container>

            <!-- Footer -->
            <Footer />
        </v-content>
    </v-app>
</template>

<script>
import Navigation from "@/components/layout/Navigation.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
    name: "App",
    components: {
        Navigation,
        Footer
    }
};
</script>
