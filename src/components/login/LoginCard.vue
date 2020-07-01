<template>
    <v-card>
        <!-- Toolbar -->
        <v-card-title>
            Inloggen

            <v-spacer />

            <v-btn v-if="isModal" icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <p>
                Kies 1 van de volgende authenticatie methoden om verder te gaan.
            </p>

            <v-btn :href="`${backendUrl}/oauth/zeus`" class="mb-4" color="primary" block depressed large>
                <v-icon left>
                    mdi-alpha-z-box-outline
                </v-icon>

                Login met Zeus WPI
            </v-btn>

            <v-btn :href="`${backendUrl}/oauth/github?auth-goal=auth`" color="dark" block depressed large>
                <v-icon left>
                    mdi-github
                </v-icon>

                Login met Github
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component
export default class LoginCard extends Vue {
    /**
     * Is the card used as a modal.
     */
    @Prop({ default: false })
    isModal: boolean;

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Get the backend url.
     */
    get backendUrl(): string {
        return process.env.VUE_APP_BACKEND_URL;
    }
}
</script>
