<template>
    <v-app>
        <!-- Navigation -->
        <navigation />

        <!-- Content -->
        <v-main>
            <!-- Potential Full Page error -->
            <error-placeholder v-if="error" :error="error.error" :options="error.options" :is-full-page="true" />

            <!-- Content -->
            <router-view v-else />
        </v-main>

        <!-- Footer -->
        <Footer />

        <!-- Modal -->
        <modal-placeholder />

        <!-- Snackbar -->
        <snackbar-placeholder />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/layout/Navigation.vue";
import Footer from "@/components/layout/Footer.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ErrorBus from "@/api/error/ErrorBus";
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { Optional } from "@/types/Optional";
import ModalPlaceholder from "@/components/layout/placeholders/ModalPlaceholder.vue";
import SnackbarPlaceholder from "@/components/layout/placeholders/SnackbarPlaceholder.vue";

@Component({
    components: {
        SnackbarPlaceholder,
        ModalPlaceholder,
        ErrorPlaceholder,
        Footer,
        Navigation
    }
})
export default class App extends Vue {
    /**
     * If a route is currently loading.
     */
    loading = false;

    /**
     * Full Page error to display.
     * If no error is specified, null will be set.
     */
    error: Optional<{ error: EchoError; options: CustomErrorOptions }> = null;

    /**
     * When the component is created.
     */
    created() {
        // Fetch the logged in user.
        this.$store.dispatch("session/fetch");

        // Fetch the users language.
        this.$store.dispatch("i18n/fetch");

        // Fetch dark theme preferences.
        this.$store.dispatch("theme/fetchDark");

        // Create a listener that will show an error when it is spawned.
        ErrorBus.$on("error", (error: EchoError, options: CustomErrorOptions) => {
            if (options.displayFullPage) {
                this.error = { error, options };
            }
        });

        // Clear the error when navigating to a different route.
        this.$router.afterEach(() => {
            this.error = null;
        });
    }
}
</script>
