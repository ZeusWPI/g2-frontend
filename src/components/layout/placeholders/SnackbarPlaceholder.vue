<template>
    <v-snackbar
        v-model="open"
        v-if="snackbar"
        :left="snackbar.x === 'left'"
        :right="snackbar.x === 'right'"
        :top="snackbar.y === 'top'"
        :bottom="snackbar.y === 'bottom'"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        @click="close"
    >
        <v-row style="width: 100%" no-gutters justify="space-between">
            <v-col align-self="center">
                {{ snackbar.message }}
            </v-col>

            <v-col cols="auto">
                <!-- Close button -->
                <v-btn icon small @click="close">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Snackbar } from "@/util/snackbar/types/Snackbar";
import SnackbarBus from "@/util/snackbar/SnackbarBus";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";

@Component
export default class SnackbarPlaceholder extends Vue {
    /**
     * If the snackbar should be open.
     */
    open = false;

    /**
     * Snackbar to display.
     */
    snackbar: Snackbar | null = null;

    /**
     * When the component is created.
     */
    created() {
        SnackbarBus.$on("snackbar-open", (snackbar: Snackbar) => {
            this.snackbar = snackbar;
            this.open = true;
        });

        SnackbarBus.$on("snackbar-close", () => {
            this.open = false;
        });
    }

    /**
     * Close the snackbar.
     */
    close() {
        SnackbarHandler.close();
    }
}
</script>
