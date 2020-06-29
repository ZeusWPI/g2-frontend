import { Modal } from "@/util/modal/types/Modal";
import ModalBus from "@/util/modal/ModalBus";

export class ModalHandler {
    /**
     * Open a modal.
     * @param modal Modal to open.
     */
    static open(modal: Modal): void {
        // Modal could be passed as an inline object.
        // This will not contain the default values.
        // Create an empty modal so default values are present.
        const modalInstance = { ...new Modal(), ...modal };

        // Emit the modal open event on the ModalBus.
        ModalBus.$emit("modal-open", modalInstance);
    }

    /**
     * Close any open modal.
     */
    static close(): void {
        // Emit the modal close event on the ModalBus.
        ModalBus.$emit("modal-close");
    }
}
