<template>
    <v-dialog
        v-if="modal"
        v-model="open"
        :max-width="modal.width"
        :fullscreen="modal.fullscreen"
        :transition="modal.transition"
    >
        <!-- Component -->
        <component v-if="modal.component" :is="modal.component" :payload="modal.componentPayload" />
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Modal } from "@/util/modal/types/Modal";
import ModalBus from "@/util/modal/ModalBus";

@Component
export default class ModalPlaceholder extends Vue {
    /**
     * If the modal should be open.
     */
    open = false;

    /**
     * Modal to display.
     */
    modal: Modal | null = null;

    /**
     * When the component is created.
     */
    created() {
        ModalBus.$on("modal-open", (modal: Modal) => {
            this.modal = modal;
            this.open = true;
        });

        ModalBus.$on("modal-close", () => {
            this.open = false;
        });
    }
}
</script>
