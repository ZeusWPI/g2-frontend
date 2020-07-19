<template>
    <v-card>
        <!-- Toolbar -->
        <v-card-title>
            {{ t("confirmModal.title") }}

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <!-- Message -->
        <v-card-text v-html="payload.message" />

        <!-- Actions -->
        <v-card-actions>
            <v-spacer />

            <!-- Cancel -->
            <v-btn color="error" text @click="close" :disabled="modifications.loading">
                {{ t("cancel") }}
            </v-btn>

            <!-- Confirm -->
            <v-btn
                color="primary"
                depressed
                @click="confirm"
                :disabled="modifications.loading"
                :loading="modifications.loading"
            >
                {{ t("confirm") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";

@Component
export default class ConfirmModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        message: string;
        action: (modifications: ConfirmModalModifications) => void;
    };

    /**
     * Modifications
     * These modify the looks of the confirm modal.
     */
    modifications: ConfirmModalModifications = {
        loading: false
    };

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }
    /**
     * Execute the confirm action.
     */
    confirm() {
        this.payload.action(this.modifications);
    }
}
</script>
