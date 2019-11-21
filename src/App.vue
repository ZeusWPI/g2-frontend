<template>
    <v-app>
        <v-content>
            <!-- Navigation -->
            <Navigation />

            <!-- Content -->
            <v-container grid-list-md style="margin-bottom: 130px;">
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
    },
    created() {
        // Fetch dark theme preferences.
        this.$store.dispatch("fetchDark");
    }
};
</script>

<style lang="scss">
.v-card__title {
    color: var(--v-primary-base);
}
</style>
