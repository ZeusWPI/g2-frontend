<template>
    <v-app>
        <v-content>
            <!-- Navigation -->
            <Navigation />

            <!-- Content -->
            <v-container grid-list-md style="margin-bottom: 200px;">
                <router-view />
            </v-container>

            <!-- Footer -->
            <Footer />

            <!-- Modal -->
            <Modal />

            <!-- Snackbar -->
            <Snackbar />
        </v-content>
    </v-app>
</template>

<script>
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Modal from "@/components/Modal";
import Snackbar from "@/components/Snackbar";

export default {
    name: "App",
    components: {
        Navigation,
        Footer,
        Modal,
        Snackbar
    },
    created() {
        // Fetch dark theme preferences.
        this.$store.dispatch("theme/fetchDark");
    }
};
</script>

<style lang="scss">
.v-card__title {
    color: var(--v-primary-base);
}

.center {
    text-align: center;
}

.center--width {
    text-align: center;
    width: 100%;
}
</style>
